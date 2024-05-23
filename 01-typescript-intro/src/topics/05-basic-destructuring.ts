//DESTRUCTURING OF OBJECTS

// interface AudioPlayer{
//     audioVolume:number;
//     songDuration:number;
//     song:string;
//     details:Details;
// }

// interface Details{
//     author:string;
//     year:number;
// }

// const audioPlayer: AudioPlayer = {
//     audioVolume: 90,
//     songDuration: 36,
//     song: "Mess",
//     details: {
//         author: "Ed Sheeran",
//         year: 2015
//     }
// }

// const song = "New Song";

// const { song: anotherSong, songDuration: duration, details } = audioPlayer;
// const { author } = details

// console.log( { anotherSong, duration, author } );

//DESTRUCTURING OF ARRAYS

// const dbz:string[] = ['Goku', 'Vegeta','Trunks', "Freezer"];
// const freezer = dbz[3] || "No hay personaje"

// // console.log("Personaje 3:",dbz[3] || "No hay personaje")
// console.log("Personaje 3:",freezer)

const [p1, p2, trunks = "Not Found"]:string[] = ['Goku', 'Vegeta'];
console.log("Personaje 3:",trunks)

export {};