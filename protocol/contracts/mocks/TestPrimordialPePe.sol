pragma solidity ^0.8.0;

import "../libraries/ERC20.sol";

contract TestSpawn is ERC20 {

    bool public minable = false;
    string internal _name = 'TestSpawn';
    string internal _symbol = 'TSPAWN';
    uint8 internal _decimals = 18;
    uint256 internal max_mining = 420690000000000000000000000000000;
    address allowed_miner;

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function activate() external payable {
        require(minable == false, "INVALID");
        allowed_miner = msg.sender;
        minable = true;

        _mint(msg.sender, 2000000 ether);
    }

    function mintSupplyFromMinedLP(
        address miner,
        uint256 value
    ) external payable {
        require(minable == true, "INVALID");
        require(msg.sender == allowed_miner, "INVALID");
        uint _supply = totalSupply();
        uint _calculated = _supply + value;

        require(_calculated <= max_mining, "EXCEEDS MAX");
        _mint(miner, value);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

}
