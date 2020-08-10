rooms=[

]
getRooms=()=>{
    return rooms
}
addRoom=(room)=>{
    rooms.push(room)
}
deleteRoom=(room)=>{
    var index = rooms.findIndex(x=>x===room)
    if(index>=0) rooms.splice(index,1)
}
deleteRooms=(roomData)=>{
    roomData.map((m)=>{
        var index = rooms.findIndex(x=>x===m.RoomName)
        if(index>=0) rooms.splice(index,1)
    })

}
module.exports = {
    getRooms, addRoom, deleteRoom, deleteRooms
}