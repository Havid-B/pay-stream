
import { Masa } from "@masa-finance/masa-sdk";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

export abstract class MasaService {

    static SOUL_NAME_TAG = 'paystream';

    public static async createSoulName(soulName: string, _provider: ExternalProvider, soulNameContractAddress: string, storeAPI: string) {

        const provider  = new Web3Provider(_provider);
        const signer = provider.getSigner();

        const address = await signer.getAddress();

        const masa = new Masa({
            signer,
            networkName: this.getNetworkName(await signer.getChainId()),
        });

        await masa.session.login();

        const extension = await masa.contracts.instances.SoulNameContract.extension();

        // Remove extension
        if (soulName.endsWith(extension)) {
            soulName = soulName.replace(extension, "");
        }

        const isAvailable = await masa.contracts.soulName.isAvailable(soulName);

        if(!isAvailable) return `Soulname ${soulName}${extension} already taken.`;
  
        const { isValid, message } = masa.soulName.validate(soulName);
    
        if (!isValid) {
            return message;
        }

        const duration = 100; // Use a large value for YearPeriod as we don't expect it to expire
        const result = await  masa.soulName.create('CELO',soulName, duration, address, MasaService.SOUL_NAME_TAG);

        await masa.session.logout();

        if(result.success) return result.soulName
        

        return address;
    }

    public static async isSoulNameValid(soulName: string, _provider: ExternalProvider) {
        const provider  = new Web3Provider(_provider);
        const signer = provider.getSigner();

        const masa = new Masa({
            signer,
            networkName: this.getNetworkName(await signer.getChainId()),
        });

        const { isValid, message } = masa.soulName.validate(soulName);
        
        return {isValid, message};
    }

    public static async isSoulNameAvailable(soulName: string, _provider: ExternalProvider) {
        const provider  = new Web3Provider(_provider);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const masa = new Masa({
            signer,
            networkName: this.getNetworkName(await signer.getChainId()),
        });

        const extension = await masa.contracts.instances.SoulNameContract.extension();
        
        // Remove extension
        if (soulName.endsWith(extension)) {
            soulName = soulName.replace(extension, "");
        }

        return await masa.contracts.soulName.isAvailable(soulName);
    }

    public static async resolveSoulName(soulName: string, provider: ExternalProvider) {

        const signer = new Web3Provider(provider).getSigner();

        const masa = new Masa({
            signer,
            networkName: this.getNetworkName(await signer.getChainId()),
        });

        return masa.soulName.resolve(soulName);
    }

    public static async resolveAddress(provider: ExternalProvider) {

        const signer = new Web3Provider(provider).getSigner();

        const masa = new Masa({
            signer,
            networkName: this.getNetworkName(await signer.getChainId()),
        });

        const soulNames = await masa.soulName.loadSoulNames(await signer.getAddress());

        const choiceSoulName = soulNames.find(async soulName => {

            const details = await masa.soulName.loadSoulNameByName(soulName);
            const uri = details?.tokenUri;
            const uriDetails = await (await fetch(uri!)).json();
            return uriDetails.style === this.SOUL_NAME_TAG;
        })

        return choiceSoulName;
    }


    private static getNetworkName(chainID: number) {
        if(chainID === 42220) return 'celo'

        return 'alfajores';
    }

}
