//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Storage {

int MyNumber;

function store (int _a) public {
MyNumber = _a;
}

function read() public view returns (int){ 
    return MyNumber;
}
}