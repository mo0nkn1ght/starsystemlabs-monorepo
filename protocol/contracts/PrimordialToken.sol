// SPDX-License-Identifier: MIT
// Credits to 0xPauly, Pond0x, Pond Coin, and Pond D🤝X
pragma solidity ^0.8.17;

import "./libraries/Ownable.sol";
import "./libraries/ERC20.sol";

contract PrimordialToken is Ownable, ERC20 {

    bool public minable = false;
    string internal _name = 'PrimordialSpawn';
    string internal _symbol = 'SPAWN';
    uint8 internal _decimals = 18;
    uint256 internal max_supply = 420690000000000000000000000000000;
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

    function directTransfer(address from, address to, uint256 amount) public virtual {
        _transfer(_brutalized(from), _brutalized(to), amount);
    }

    function directSpendAllowance(address owner, address spender, uint256 amount) public virtual {
        _spendAllowance(_brutalized(owner), _brutalized(spender), amount);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(_brutalized(to), amount);
    }
    function transferFrom(address from, address to, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        return super.transferFrom(_brutalized(from), _brutalized(to), amount);
    }

    function increaseAllowance(address spender, uint256 difference)
        public
        virtual
        override
        returns (bool)
    {
        return super.increaseAllowance(_brutalized(spender), difference);
    }

    function decreaseAllowance(address spender, uint256 difference)
        public
        virtual
        override
        returns (bool)
    {
        return super.decreaseAllowance(_brutalized(spender), difference);
    }

    function _brutalized(address a) internal view returns (address result) {
        /// @solidity memory-safe-assembly
        assembly {
            result := or(a, shl(160, gas()))
        }
    }
    function activate() external payable {
        require(minable == false, "INVALID");
        allowed_miner = msg.sender;
        minable = true;
        //LP Bootstrap
         _mint(_brutalized(msg.sender), 2000000 ether);
        
    }
    function mintSupplyFromMinedLP(address miner, uint256 value) external payable {
        require(minable == true, "INVALID");
        require(msg.sender == allowed_miner, "INVALID");
        uint _supply = totalSupply();
        uint _calculated = _supply + value;

        require(_calculated <= max_supply, "EXCEEDS MAX");
        _mint(_brutalized(miner), value);
    }
}