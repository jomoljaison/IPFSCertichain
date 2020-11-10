pragma experimental ABIEncoderV2;

import "./Person.sol";

contract Student is Person {
    
    struct courses {
        string name;
        uint roomNo;
    }
    
    mapping(uint => courses) public enrolled;

    mapping(uint => string) ipfsUrl;
    
    function enrollment(uint _studendId, string memory _courseName, uint _roomNo) public {
        enrolled[_studendId] = courses(_courseName, _roomNo);
    }
    
    function getDetails(uint _studendId) public view returns(details memory _profile, courses memory _courses, string memory _url){
        return (profile[_studendId], enrolled[_studendId], ipfsUrl[_studendId]);
    }

    function setStudent(uint _studentId, string memory _name, uint _age, bool  _disabled, string memory _courseName, uint _roomNo) public{
        profile[_studentId] = details(_name, _age, _disabled);
        enrolled[_studentId] = courses(_courseName, _roomNo);
    }

    function setIfpsUrl(uint _studentId, string memory _url) public {
        ipfsUrl[_studentId] = _url;
    }
}