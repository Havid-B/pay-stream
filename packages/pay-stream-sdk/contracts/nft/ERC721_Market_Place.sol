// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../interfaces/IERC721_Market_Place.sol";

contract ERC721MarketPlace is IERC721MarketPlace, ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    using Address for address;
    uint platformFee; // 100 is same as 1%, 1000 is same as 0.1%
    address feeCollector;
    mapping(uint => TokenInfo) public tokensInfo;

    Counters.Counter private _tokenIdCounter;

    modifier onlyTokenOwner(uint nftTokenId) {
        if (ownerOf(nftTokenId) != msg.sender) revert NotTokenOwner();
        _;
    }
    modifier onlySellableToken(uint nftTokenId) {
        if (!tokensInfo[nftTokenId].sellable) revert NotSellable();
        _;
    }

    mapping(uint => uint) totalTipsByTokenID;

    constructor(string memory tokenName, string memory tokenSymbol, uint _platformFee, address _feeCollector) ERC721(tokenName, tokenSymbol) {
        platformFee = _platformFee;
        feeCollector = _feeCollector;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(string memory uri, uint price, bool sellable) public  {
        uint256 tokenID = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_msgSender(), tokenID);
        _setTokenURI(tokenID, uri);

        // Approve this contract as an operator
        approve(address(this), tokenID);

        TokenInfo storage TokenInfo = tokensInfo[tokenID];
        TokenInfo.sellable = sellable;
        TokenInfo.price = price;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function tipCreator(uint tokenID) external payable onlyOwner {
        address seller = ownerOf(tokenID);

        uint fee = msg.value / platformFee;

        Address.sendValue(payable(feeCollector),fee);
        Address.sendValue(payable(seller),msg.value - fee);

        emit TokenCreatorTipped(seller, msg.sender, tokenID, msg.value, block.timestamp);
    }

    function setPrice(uint nftTokenId, uint price) external onlyTokenOwner(nftTokenId) {
        TokenInfo storage tokenInfo = tokensInfo[nftTokenId];
        tokenInfo.price = price;

        emit TokenUpdated(nftTokenId, price, tokenInfo.sellable);
    }

    function setSellable(uint nftTokenId, bool sellable) external onlyTokenOwner(nftTokenId) {
        TokenInfo storage tokenInfo = tokensInfo[nftTokenId];
        tokenInfo.sellable = sellable;

        emit TokenUpdated(nftTokenId, tokenInfo.price, sellable);
    }

    function setTokenInfo(uint nftTokenId, uint price, bool sellable) public onlyTokenOwner(nftTokenId) {
        TokenInfo storage tokenInfo = tokensInfo[nftTokenId];
        tokenInfo.price = price;
        tokenInfo.sellable = sellable;

        emit TokenUpdated(nftTokenId, price, tokenInfo.sellable);
    }

    function buyNft(
        uint nftTokenId,
        uint newPrice,
        bool sellable
    ) external payable onlySellableToken(nftTokenId) {
        address seller = ownerOf(nftTokenId);

        uint tokenPrice = tokensInfo[nftTokenId].price;
        if (msg.value < tokenPrice) revert InsufficientPayment();

        this.safeTransferFrom(seller, _msgSender(), nftTokenId);

        setTokenInfo(nftTokenId, newPrice, sellable);

        uint fee = msg.value / platformFee;
        Address.sendValue(payable(feeCollector), fee);
        Address.sendValue(payable(seller), msg.value - fee);


        emit TokenSold(seller, msg.sender, nftTokenId, msg.value, block.timestamp);
    }

    function setFeeCollector(address _feeCollector) public onlyOwner {
        feeCollector = _feeCollector;
    }

    function setPlatformFee(uint _platformFee) public onlyOwner {
        platformFee = _platformFee;
    }
}