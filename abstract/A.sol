pragma solidity ^0.4.15;

import "./GeometricShapes.sol";

contract A is GeometricShapes {
    mapping (bytes32 => Point) public points;

    function getPoint(bytes32 index) constant public returns (uint x, uint y) {
        return (points[index].x, points[index].y);
    }

    function setPoint(bytes32 index, uint x, uint y) public {
        points[index] = Point(x, y);
    }
}
