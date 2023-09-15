pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TestToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    bool public minable = false;
    address public allowed_miner;
    uint256 public max_mining = 420690000000000000000000000000000;

    constructor(
        address defaultAdminRole,
        address defaultMinterRole
    ) ERC20("TestToken", "TT") {
        _setupRole(DEFAULT_ADMIN_ROLE, defaultAdminRole);
        _setupRole(MINTER_ROLE, defaultMinterRole);
    }

    function activate() external payable {
        require(!minable, "Already activated");
        require(hasRole(MINTER_ROLE, msg.sender), "Must have minter role to activate");
    
        allowed_miner = msg.sender;
        minable = true;
    
        _mint(msg.sender, 2000000 ether);
    }

    function mintSupplyFromMinedLP(address miner, uint256 value) external payable {
        require(minable, "INVALID");
        require(msg.sender == allowed_miner, "INVALID");
    
        uint _supply = totalSupply();
        uint _calculated = _supply + value;

        require(_calculated <= max_mining, "EXCEEDS MAX");
    
        _mint(miner, value);
    }

    function grantMinterRole(address account) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "TestToken: must have admin role to grant minter role"
        );
        grantRole(MINTER_ROLE, account);
    }

    function revokeMinterRole(address account) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "TestToken: must have admin role to revoke minter role"
        );
        revokeRole(MINTER_ROLE, account);
    }
}
