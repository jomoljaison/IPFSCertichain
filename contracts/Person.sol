pragma solidity ^0.5.0;

contract Person {
    
    struct details{
        string name;
        uint age;
        bool disabled;
    }
    
    mapping(uint => details) profile;
    
    function setProfile(uint _studendId,string memory _name, uint _age, bool  _disabled) public {
        profile[_studendId] = details(_name, _age, _disabled);
    }

    function getProfile(uint _studentId) public view returns(string memory _name, uint _age, bool _disabled) {
        return (profile[_studentId].name, profile[_studentId].age, profile[_studentId].disabled);
    }
}