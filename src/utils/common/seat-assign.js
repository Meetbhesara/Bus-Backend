function seatAssign(totalSeats)
{
    const seats=[];
    for(let i=1;i<=totalSeats;i++)
    {
        seats.push({
            seatNumber:i,
            status:'available',
            gender:null
        });
    }
    return seats;
}
module.exports = seatAssign;
