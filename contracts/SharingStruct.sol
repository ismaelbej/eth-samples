pragma solidity ^0.7.0;

abstract contract GeometricShapes {
    struct Point {
        uint x;
        uint y;
    }
}

contract A is GeometricShapes {
    mapping (bytes32 => Point) public points;

    function getPoint(bytes32 index) view public returns (uint x, uint y) {
        return (points[index].x, points[index].y);
    }

    function setPoint(bytes32 index, uint x, uint y) public {
        points[index] = Point(x, y);
    }
}

contract B is GeometricShapes {
    Point[2] public rectangle;

    function getWidth() view public returns (uint w) {
        if (rectangle[0].x >= rectangle[1].y) {
            return rectangle[0].x - rectangle[1].x;
        }
        return rectangle[1].x - rectangle[0].x;
    }

    function move(uint dx, uint dy) public {
        rectangle[0].x += dx;
        rectangle[1].x += dx;
        rectangle[0].y += dy;
        rectangle[1].y += dy;
    }
}
