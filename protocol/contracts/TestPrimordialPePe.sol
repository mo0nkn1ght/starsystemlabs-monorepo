pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TestToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(
        address defaultAdminRole,
        address defaultMinterRole
    ) ERC20("TestToken", "TT") {
        _setupRole(DEFAULT_ADMIN_ROLE, defaultAdminRole);
        _setupRole(MINTER_ROLE, defaultMinterRole);
    }

    function mint(address to, uint256 amount) public {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "TestToken: must have minter role to mint"
        );
        _mint(to, amount);
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
