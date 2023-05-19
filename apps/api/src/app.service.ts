import { Injectable } from '@nestjs/common';
import { SpheronClient, ProtocolEnum } from '@spheron/storage';

@Injectable()
export class AppService {
  private spheronClient = new SpheronClient({
    token: process.env.SPHERONTOKEN,
  });

  getHello() {
    return 'Hello World!';
  }

  async uploadToSpheron(file: Express.Multer.File) {
    let currentlyUploaded = 0;
    let { protocolLink } = await this.spheronClient.upload(file.path, {
      protocol: ProtocolEnum.IPFS,
      onUploadInitiated: (uploadId) => {
        console.log(`Upload with id ${uploadId} started...`);
      },
      onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize;
        console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
      },
      name: 'fileUpload',
    });

    protocolLink = protocolLink.replace('https://', 'https://ipfs.io/ipfs/');
    protocolLink = protocolLink.replace('.ipfs.sphn.link', '');
    return {
      link: `${protocolLink}/${file.filename}`,
    };
  }
}
