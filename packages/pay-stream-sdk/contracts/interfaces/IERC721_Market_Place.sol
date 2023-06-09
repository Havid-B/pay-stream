//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IERC721MarketPlace {
    struct TokenInfo {
        bool sellable;
        uint price;
    }

    error NotTokenOwner();
    error NotSellable();
    error InsufficientPayment();

    event TokenUpdated(uint indexed nftTokenId, uint indexed price, bool indexed sellable);

    event TokenSold(
        address indexed seller,
        address indexed buyer,
        uint indexed nftTokenId,
        uint amount,
        uint time
    );

    event TokenCreatorTipped(
        address indexed seller,
        address indexed tipper,
        uint indexed nftTokenId,
        uint amount,
        uint time
    );

    function safeMint(string memory uri, uint price, bool sellable) external;

    function setPrice(uint nftTokenId, uint price) external;

    function setSellable(uint nftTokenId, bool sellable) external;

    function buyNft(
        uint nftTokenId,
        uint newPrice,
        bool sellable
    ) external payable;


    function setTokenInfo(uint nftTokenId, uint price, bool sellable) external;
}