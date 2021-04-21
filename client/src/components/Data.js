//import logo
import logo from '../images/icon/logo.png';
import fontLogo from '../images/icon/WaysFood.png';

//import image 1
import kfc from '../images/kfc.png';
import burgerKing from '../images/burger-king.png';
import jco from '../images/jco.png';
import sbuck from '../images/sbuck.png';

//import image 2
import geprek from '../images/geprek.jpg';
import nasiGoreng from '../images/nasi-goreng.jpg';
import pecelAyam from '../images/pecel-ayam.jpg';
import kopi from '../images/kopi.jpg';

//import image product
import geprek1 from '../images/w6441.png';
import geprek2 from '../images/w6441-1.png';
import geprek3 from '../images/w6441-2.png';
import geprek4 from '../images/w6441-3.png';

export const restaurant = [
    {
        id: 1,
        title: "Burger King",
        img: burgerKing
    },
    {
        id: 2,
        title: "Starbucks",
        img: sbuck
    },
    {
        id: 3,
        title: "KFC",
        img: kfc
    },
    {
        id: 4,
        title: "Jco",
        img: jco
    }
]

export const history = [
    {
        id: 1,
        title: "Geprek Bensu",
        day: "Saturday",
        date: "12 March 2021",
        total: "45.000",
        imgLogo: logo,
        imgFont: fontLogo
    },
]

export const restaurantNear = [
    {
        id: 1,
        title: "Geprek Bensu",
        img: geprek,
        distance: "0,2 KM",
        product: [
            {
                id: 1,
                title: "Paket Geprek",
                price: "15000",
                img: geprek1,
            },
            {
                id: 2,
                title: "Paket Geprek Keju",
                price: "20000",
                img: geprek2
            },
            {
                id: 3,
                title: "Paket Geprek Leleh",
                price: "25000",
                img: geprek3
            },
            {
                id: 4,
                title: "Paket Sambel Matah",
                price: "15000",
                img: geprek4
            }
        ]
    },
    {
        id: 2,
        title: "Nasi Goreng Mas Rony",
        img: nasiGoreng,
        distance: "0,6 KM",
        product: []
    },
    {
        id: 3,
        title: "Pecel Ayam Prambanan",
        img: pecelAyam,
        distance: "0,6 KM",
        product: []
    },
    {
        id: 4,
        title: "Kopi Kenangan",
        img: kopi,
        distance: "1,6 KM",
        product: []
    }
]

export const transaction = [
    {
        id: 1,
        name: "Denny",
        address: "Surabaya",
        productOrder: "Geprek Keju",
        status: "Waiting Approve",

    },
    {
        id: 2,
        name: "Sugiono",
        address: "Surabaya",
        productOrder: "Geprek Keju Leleh",
        status: "Success",

    },
    {
        id: 3,
        name: "Sukijo",
        address: "Surabaya",
        productOrder: "Geprek Keju",
        status: "Cancel",

    },
    {
        id: 4,
        name: "Bima",
        address: "Surabaya",
        productOrder: "Geprek Sambel Matah",
        status: "On The Way",

    }
]