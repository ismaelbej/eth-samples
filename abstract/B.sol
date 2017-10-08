pragma solidity ^0.4.15;

import "./GeometricShapes.sol";

contract B is GeometricShapes {
    Point[2] public rectangle;

    function getWidth() constant public returns (uint w) {
        if (rectangle[0].x >= rectangle[1].y)
            return rectangle[0].x - rectangle[1].x;
        return rectangle[1].x - rectangle[0].x;
    }

    function move(uint dx, uint dy) public {
        rectangle[1] = Point(dx, dy);
    }
}
