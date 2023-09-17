// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./interfaces/IPrimordialPePe.sol";
import "./libraries/PrimordialPlanetsLibrary.sol";

contract PrimordialPlanets is ERC721Enumerable {
    using PrimordialPlanetsLibrary for uint8;

    struct Trait {
        string traitName;
        string traitType;
        string pixels;
        uint256 pixelCount;
    }


    //Mappings
    mapping(uint256 => Trait[]) public traitTypes;
    mapping(string => bool) hashToMinted;
    mapping(uint256 => string) internal tokenIdToHash;

    //uint256s
    uint256 MAX_SUPPLY = 10000;
    uint256 MINTS_PER_TIER = 2000;
    uint256 SEED_NONCE = 0;

    //string arrays
    string[] LETTERS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
    ];

    //uint arrays
    uint16[][8] TIERS;

    //address
    address primordialPePeAddress;
    address _owner;

    //bool
    bool mintEnabled;

    constructor() ERC721("PrimordialPlanets", "PLANETS") {
        _owner = msg.sender;

        //Declare all the rarity tiers
        //Satellites
        TIERS[0] = [500, 500, 700, 700, 1100, 1200, 1300, 1000, 1500, 2500];
        //Rings
        TIERS[1] = [300, 400, 500, 800, 800, 1000, 1000, 1200, 1500, 2500];
        //Atmosphere 
        TIERS[2] = [800, 1500, 1500, 1500, 1500, 1500, 1700];
        //Planet Type by Composition
        TIERS[3] = [200, 300, 500, 500, 500, 500, 500, 500, 500, 500, 600, 600, 700, 700, 700, 800, 1400];
        //Crust Resources
        TIERS[4] = [200, 500, 500, 600, 700, 1300, 1300, 1500, 1500, 1900];
        //Mantle
        TIERS[5] = [500, 1000, 1000, 1500, 1500, 2000, 2500];
        //Core
        TIERS[6] = [200, 300, 700, 700, 700, 1200, 1300, 1300, 1300, 2300];
        //Background
        TIERS[7] = [500, 1000, 1500, 2000, 5000];
    }

    /*
    ___  ____       _   _              ______                _   _                 
    |  \/  (_)     | | (_)             |  ___|              | | (_)                
    | .  . |_ _ __ | |_ _ _ __   __ _  | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
    | |\/| | | '_ \| __| | '_ \ / _` | |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    | |  | | | | | | |_| | | | | (_| | | | | |_| | | | | (__| |_| | (_) | | | \__ \
    \_|  |_/_|_| |_|\__|_|_| |_|\__, | \_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                                 __/ |                                             
                                |___/                                              
   */

    /**
     * @dev Converts a digit from 0 - 10000 into its corresponding rarity based on the given rarity tier.
     * @param _randinput The input from 0 - 10000 to use for rarity gen.
     * @param _rarityTier The tier to use.
     */
    function rarityGen(uint256 _randinput, uint8 _rarityTier)
        internal
        view
        returns (string memory)
    {
        uint16 currentLowerBound = 0;
        for (uint8 i = 0; i < TIERS[_rarityTier].length; i++) {
            uint16 thisPercentage = TIERS[_rarityTier][i];
            if (
                _randinput >= currentLowerBound &&
                _randinput < currentLowerBound + thisPercentage
            ) return i.toString();
            currentLowerBound = currentLowerBound + thisPercentage;
        }

        revert();
    }

    /**
     * @dev Generates a 9 digit hash from a tokenId, address, and random number.
     * @param _t The token id to be used within the hash.
     * @param _a The address to be used within the hash.
     * @param _c The custom nonce to be used within the hash.
     */
    function hash(
        uint256 _t,
        address _a,
        uint256 _c
    ) internal returns (string memory) {
        require(_c < 10);

        // This will generate a 9 character string.
        //The last 8 digits are random, the first is 0, due to the planet not being burned.
        string memory currentHash = "0";

        for (uint8 i = 0; i < 8; i++) {
            SEED_NONCE++;
            uint16 _randinput = uint16(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.prevrandao,
                            _t,
                            _a,
                            _c,
                            SEED_NONCE
                        )
                    )
                ) % 10000
            );

            currentHash = string(
                abi.encodePacked(currentHash, rarityGen(_randinput, i))
            );
        }

        if (hashToMinted[currentHash]) return hash(_t, _a, _c + 1);

        return currentHash;
    }

    /**
     * @dev Returns the current primordialPePe cost of minting.
     */
    function currentPrimordialPePeCost() public view returns (uint256) {
        uint256 _totalSupply = totalSupply();

        if (_totalSupply <= 2000) return 0;
        if (_totalSupply > 2000 && _totalSupply <= 4000)
            return 1000000000000000000;
        if (_totalSupply > 4000 && _totalSupply <= 6000)
            return 2000000000000000000;
        if (_totalSupply > 6000 && _totalSupply <= 8000)
            return 3000000000000000000;
        if (_totalSupply > 8000 && _totalSupply <= 10000)
            return 4000000000000000000;

        revert();
    }

    /**
     * @dev Mint internal, this is to avoid code duplication.
     */
    function mintInternal() internal {
        uint256 _totalSupply = totalSupply();
        require(_totalSupply < MAX_SUPPLY);
        require(!PrimordialPlanetsLibrary.isContract(msg.sender));

        uint256 thisTokenId = _totalSupply;

        tokenIdToHash[thisTokenId] = hash(thisTokenId, msg.sender, 0);

        hashToMinted[tokenIdToHash[thisTokenId]] = true;

        _mint(msg.sender, thisTokenId);
    }

    /**
     * @dev Mints new tokens.
     */
    function mintPlanet() public {
        require (mintEnabled);
        if (totalSupply() < MINTS_PER_TIER) return mintInternal();

        //Burn this much primordialPePe
        IPrimordialPePe(primordialPePeAddress).burnFrom(msg.sender, currentPrimordialPePeCost());

        return mintInternal();
    }

    /**
     * @dev Dev team mint tokens.
     * disables automatically once dev mint cap is met and enables public mint
     */
    function devTeamMint() public onlyOwner
        {
        require (!mintEnabled);
        if (totalSupply() == 99) mintEnabled=true;
        return mintInternal();
    }

    /**
     * @dev Burns and mints new.
     * @param _tokenId The token to burn.
     */
    function burnForMint(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);

        //Burn token
        _transfer(
            msg.sender,
            0x000000000000000000000000000000000000dEaD,
            _tokenId
        );

        mintInternal();
    }

    /*
    ______               _  ______                _   _                 
    | ___ \             | | |  ___|              | | (_)                
    | |_/ /___  __ _  __| | | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
    |    // _ \/ _` |/ _` | |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    | |\ \  __/ (_| | (_| | | | | |_| | | | | (__| |_| | (_) | | | \__ \
    \_| \_\___|\__,_|\__,_| \_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

    */

    /**
     * @dev Helper function to reduce pixel size within contract
     */
    function letterToNumber(string memory _inputLetter)
        internal
        view
        returns (uint8)
    {
        for (uint8 i = 0; i < LETTERS.length; i++) {
            if (
                keccak256(abi.encodePacked((LETTERS[i]))) ==
                keccak256(abi.encodePacked((_inputLetter)))
            ) return (i + 1);
        }
        revert();
    }

     /**
     * @dev Hash to SVG function
     */
    function hashToSVG(string memory _hash)
        public
        view
        returns (string memory)
    {
        string memory svgString;
        bool[24][24] memory placedPixels;

        for (uint8 i = 0; i < 9; i++) {
            uint8 thisTraitIndex = PrimordialPlanetsLibrary.parseInt(
                PrimordialPlanetsLibrary.substring(_hash, i, i + 1)
            );

            for (
                uint16 j = 0;
                j < traitTypes[i][thisTraitIndex].pixelCount;
                j++
            ) {
                string memory thisPixel = PrimordialPlanetsLibrary.substring(
                    traitTypes[i][thisTraitIndex].pixels,
                    j * 4,  
                    j * 4 + 4  
                );

                uint8 x = letterToNumber( //edit for base64 encoding
                    PrimordialPlanetsLibrary.substring(thisPixel, 0, 1)  
                );
                uint8 y = letterToNumber( // edit for base64 encoding
                    PrimordialPlanetsLibrary.substring(thisPixel, 1, 2)  
                );

                if (placedPixels[x][y]) continue;

                svgString = string(
                    abi.encodePacked(
                        svgString,
                        "<rect class='c",
                        PrimordialPlanetsLibrary.substring(thisPixel, 2, 4),  
                        "' x='",
                        x.toString(),
                        "' y='",
                        y.toString(),
                        "'/>"
                    )
                );

                placedPixels[x][y] = true;
            }
        }

        svgString = string(
            abi.encodePacked(
                '<svg id="mouse-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 24 24"> ',
                svgString,
                "<style>rect{width:1px;height:1px;} #mouse-svg{shape-rendering: crispedges;} .c00{fill:#000000}...[INCLUDE ALL COLOR CODES]...</style></svg>"
            )
        );

        return svgString;
    }

    /**
     * @dev Hash to metadata function
     */
    function hashToMetadata(string memory _hash)
        public
        view
        returns (string memory)
    {
        string memory metadataString;

        for (uint8 i = 0; i < 9; i++) {
            uint8 thisTraitIndex = PrimordialPlanetsLibrary.parseInt(
                PrimordialPlanetsLibrary.substring(_hash, i, i + 1)
            );

            metadataString = string(
                abi.encodePacked(
                    metadataString,
                    '{"trait_type":"',
                    traitTypes[i][thisTraitIndex].traitType,
                    '","value":"',
                    traitTypes[i][thisTraitIndex].traitName,
                    '"}'
                )
            );

            if (i != 8)
                metadataString = string(abi.encodePacked(metadataString, ","));
        }

        return string(abi.encodePacked("[", metadataString, "]"));
    }

    /**
     * @dev Returns the SVG and metadata for a token Id
     * @param _tokenId The tokenId to return the SVG and metadata for.
     */
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId));

        string memory tokenHash = _tokenIdToHash(_tokenId);

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    PrimordialPlanetsLibrary.encode(
                        bytes(
                            string(
                                abi.encodePacked(
                                    '{"name": "PrimordialPlanets #',
                                    PrimordialPlanetsLibrary.toString(_tokenId),
                                    '", "description": "PrimordialPlanets is a collection of 10,000 unique planets. All the metadata and images are generated and stored 100% on-chain. No IPFS, no API. Pure Blockchain.", "image": "data:image/svg+xml;base64,',
                                    PrimordialPlanetsLibrary.encode(
                                        bytes(hashToSVG(tokenHash))
                                    ),
                                    '","attributes":',
                                    hashToMetadata(tokenHash),
                                    "}"
                                )
                            )
                        )
                    )
                )
            );
    }

    /**
     * @dev Returns a hash for a given tokenId
     * @param _tokenId The tokenId to return the hash for.
     */
    function _tokenIdToHash(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        string memory tokenHash = tokenIdToHash[_tokenId];
        //If this is a burned token, override the previous hash
        if (ownerOf(_tokenId) == 0x000000000000000000000000000000000000dEaD) {
            tokenHash = string(
                abi.encodePacked(
                    "1",
                    PrimordialPlanetsLibrary.substring(tokenHash, 1, 9)
                )
            );
        }

        return tokenHash;
    }

    /**
     * @dev Returns the wallet of a given wallet. Mainly for ease for frontend devs.
     * @param _wallet The wallet to get the tokens of.
     */
    function walletOfOwner(address _wallet)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_wallet);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_wallet, i);
        }
        return tokensId;
    }

    /*
     _____                           ______                _   _                 
    |  _  |                          |  ___|              | | (_)                
    | | | |_      ___ __   ___ _ __  | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
    | | | \ \ /\ / / '_ \ / _ \ '__| |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    \ \_/ /\ V  V /| | | |  __/ |    | | | |_| | | | | (__| |_| | (_) | | | \__ \
     \___/  \_/\_/ |_| |_|\___|_|    \_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                                                                             
    */

    /**
     * @dev Clears the traits.
     */
    function clearTraits() public onlyOwner {
        for (uint256 i = 0; i < 9; i++) {
            delete traitTypes[i];
        }
    }

    /**
     * @dev Add a trait type
     * @param _traitTypeIndex The trait type index
     * @param traits Array of traits to add
     */

    function addTraitType(uint256 _traitTypeIndex, Trait[] memory traits)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < traits.length; i++) {
            traitTypes[_traitTypeIndex].push(
                Trait(
                    traits[i].traitName,
                    traits[i].traitType,
                    traits[i].pixels,
                    traits[i].pixelCount
                )
            );
        }

        return;
    }

    /**
     * @dev Sets the primordialPePe ERC20 address
     * @param _primordialPePeAddress The primordialPePe address
     */

    function setPrimordialPePeAddress(address _primordialPePeAddress) public onlyOwner {
        primordialPePeAddress = _primordialPePeAddress;
    }

    /**
     * @dev Transfers ownership
     * @param _newOwner The new owner
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        _owner = _newOwner;
    }

    /**
     * @dev Modifier to only allow owner to call functions
     */
    modifier onlyOwner() {
        require(_owner == msg.sender);
        _;
    }
}