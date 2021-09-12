
let listings = []

const salesButton = document.querySelector('.nav_btn.ac');

salesButton.addEventListener("click", () => {

    displayCarList();
});

function createButtons() {
    let buttons = document.createElement('div');
    buttons.innerHTML = `
        <label for="afisare" class="butoane_portocalii">
            <input id="afisare" type="checkbox" data-verif="f"><b> Afișează doar mașini verificate</b>
        </label>
        <button id="adauga" class="butoane_portocalii">Adauga o listare</button>
    `

    let input = buttons.querySelector('#afisare');

    input.addEventListener("click", () => {

        if (input.getAttribute('data-verif') == "f")
        {
            console.log("Am bifat optiunea pentru masini verificate"); 
            input.setAttribute('data-verif', 'a');
            setVerif(true);
        
            const vanzari = document.querySelectorAll('.vanzare');
        
            let nr = 0
            for (let v of vanzari) {
                if (v.querySelector('.badge') == null) {
                    v.style.display = "none";
                    nr += 1;
                }
            }
            console.log(`Am ignorat ${nr} listari`);
        
        } else {
            console.log("Am debifat optiunea pentru masini verificate");
            input.setAttribute('data-verif', 'f');
            input.removeAttribute("checked");
            setVerif(false);
        
            const vanzari = document.querySelectorAll('.vanzare');
        
            let nr = 0
            for (let v of vanzari) {
                if (v.querySelector('.badge') == null) {
                    v.style.display = "grid";
                    nr += 1;
                }
            }
            console.log(`Am readus ${nr} listari`);
        }});

    let addButton = buttons.querySelector('#adauga');
    addButton.addEventListener("click", () => {
        displaySubmitWindow();
    })

    return buttons;
}

let aboutBtn = document.querySelector('.nav_btn.desp');

aboutBtn.addEventListener("click", () => {
    let content = document.getElementById('content');
    content.innerHTML = ``;

    let newDiv = document.createElement('div');
    newDiv.className = "despre";

    let title = document.createElement('h1');
    title.innerText = "DESPRE NOI";

    let paragraph = document.createElement('p');
    paragraph.innerText = `Suntem o companie mică, a cărui scop este să ușureze vânzarea și cumpărarea de mașini la mâna a doua.
    Sediul nostru se află la București, dar lucrăm cu mașini din toată țara. Odată ce pui un listing pe site-ul
    nostru, poți face o cerere ca unul din oamenii noștri să vină să îți inspecteze mașina și să o ia la un mic
    test-drive, pentru a se asigura că se află în condițiile publicate de tine pe website. Dacă mașina trece testul,
    listing-ul de pe site va primi o fundiță ca să asigure cumpărătorii că mașina îndeplinește toate condițiile
    promise de către tine!`

    newDiv.appendChild(title);
    newDiv.appendChild(paragraph);
    content.appendChild(newDiv)
})

let contactBtn = document.querySelector('.nav_btn.cont');

contactBtn.addEventListener("click", () => {
    let content = document.getElementById('content');
    content.innerHTML = `
    <div class="contact">
            <h1 style="color: rgb(231, 130, 0);">CONTACTEAZĂ-NE!</h1>
            <div class="contact_link">
                <img src="insta_logo.png" class="logo">
                <p>Instagram: <a href="https://www.instagram.com/berli_stefan/" target="_blank">@berliscars</a></p>
            </div>
            <div class="contact_link">
                <img src="facebook-logo-2019.png" class="logo">
                <p>Facebook: <a href="https://www.facebook.com/stefi.cristian.5/" target="_blank">Berli's Cars</a></p>
            </div>
            <div class="contact_link">
                <img src="whatsapp-logo-transparent.png" class="logo">
                <p>Numar de telefon: <a style="color: rgb(231, 130, 0);">+0743569134</a></p>
            </div>
            <div class="contact_link">
                <img src="gmail-icon-logo-png-transparent.png" class="logo">
                <p>Email: <a style="color: rgb(231, 130, 0);">berliscars@gmail.com</a></p>
            </div>
        </div>
    `;
})

function createCarList(cars) {
    let list = document.createElement('div');
    list.className = "lista_vanzari";
    for (let car = 0; car < cars.length; car++) {

        let newSale = document.createElement('div');
        newSale.className = "vanzare";

        let img = document.createElement('img');
        img.className = "imagine_masina";
        img.src = cars[car].img;
        img.style.gridArea = "1 / 1 / 13 / 3";

        let name = document.createElement('h2');
        name.innerText = cars[car].model_name;
        name.style.gridArea = "1 / 3 / 3 / 4";
        name.style.padding = "10px";

        let seller = document.createElement('p');
        seller.innerText = "Vânzător: " + cars[car].seller;
        seller.style.gridArea = "3 / 3 / 4 / 4";
        seller.style.paddingLeft = "10px";
        
        let contact = document.createElement('p');
        contact.innerText = "Contact: " + cars[car].contact;
        contact.style.gridArea = "4 / 3 / 5 / 4";
        contact.style.paddingLeft = "10px";

        let kilometers = document.createElement('p');
        kilometers.innerText = "Kilometri parcurși: " + cars[car].kilometers.toString() + "km";
        kilometers.style.gridArea = "5 / 3 / 6 / 4";
        kilometers.style.paddingLeft = "10px";

        let year_of_purchase = document.createElement('p');
        year_of_purchase.innerText = "An cumpărare: " + cars[car].year_of_purchase;
        year_of_purchase.style.gridArea = "6 / 3 / 7 / 4";
        year_of_purchase.style.paddingLeft = "10px";

        let damage = document.createElement('p');
        damage.innerText = "Daune: " + cars[car].damage;
        damage.style.gridArea = "7 / 3 / 8 / 4";
        damage.style.paddingLeft = "10px";

        let price = document.createElement('p');
        price.innerText = "Preț: " + cars[car].price;
        price.style.gridArea = "8 / 3 / 9 / 4";
        price.style.paddingLeft = "10px";

        newSale.appendChild(img);
        newSale.appendChild(name);
        newSale.appendChild(seller);
        newSale.appendChild(contact);
        newSale.appendChild(kilometers);
        newSale.appendChild(year_of_purchase);
        newSale.appendChild(damage);
        newSale.appendChild(price);

        if (cars[car].verified == true) {
            let badge = document.createElement('img');
            badge.src = "badge.png";
            badge.className = "badge"
            badge.style.gridArea = "11 / 3 / 13 / 4";
            newSale.appendChild(badge);
        }

        list.appendChild(newSale);
    }
    return list;
}

function displayCarList() {
    fetch('http://localhost:3000/cars')
    .then( function (response) {
        response.json().then( function (cars) {
            console.log('Listă de mașini de vândut');
            listings = cars;

            let contentElement = document.getElementById('content');
            contentElement.innerHTML = ""; 

            contentElement.appendChild(createButtons());
            contentElement.appendChild(createCarList(cars));

            let input = contentElement.querySelector('#afisare');
            let check = getVerif();
            if(check == "true") {
                console.log("ignoring elements")
                input.setAttribute('data-verif', 'a');
                input.setAttribute("checked", "true");
        
                const vanzari = document.querySelectorAll('.vanzare');
        
                let nr = 0
                for (let v of vanzari) {
                    if (v.querySelector('.badge') == null) {
                        v.style.display = "none";
                        nr += 1;
                    }
                }
            }
        })
    })
    .catch( function (err) {
        console.log("A fost o problema la incarcarea masinilor.")
    });

    let content = document.getElementById('content');
    content.innerText = "loading...";
}

function displaySubmitWindow() {
    let contentElement = document.getElementById('content')
    contentElement.innerHTML = `
    <form id="submit_form">
        <label for="nume"><b>Nume complet: </b></label>
        <input type="text" id="nume" name="nume"><br><br>
        <label for="numar"><b>Număr de telefon: </b></label>
        <input type="text" id="numar" name="numar"><br><br>
        <label for="model"><b>Nume model de mașină: </b></label>
        <input type="text" id="model" name="model"><br><br>
        <label for="kilometri"><b>Kilometri parcurși: </b></label>
        <input type="text" id="kilometri" name="kilometri"><br><br>
        <label for="an"><b>Anul cumpărării: </b></label>
        <input type="text" id="an" name="an"><br><br>
        <label for="daune"><b>Daune: </b></label>
        <input type="text" id="daune" name="daune"><br><br>
        <label for="pret"><b>Preț (în euro): </b></label>
        <input type="text" id="pret" name="pret"><br><br>
        <label for="masina-img"><b>URL imagine: </b></label>
        <input type="text" id="masina-img" name="masina-img"><br><br>
        <button class="butoane_portocalii" id="submit_button" type="button">Submit</button>
     </form>
    `;

    let submitButton = contentElement.querySelector('#submit_button');
    let submitWrong = false;

    submitButton.addEventListener("click", () => {
        let newId = listings.at(-1).id;
        newId++;

        let name = contentElement.querySelector('#nume').value;
        let number = contentElement.querySelector('#numar').value;
        let model = contentElement.querySelector('#model').value;
        let kilometers = contentElement.querySelector('#kilometri').value;
        let year = contentElement.querySelector('#an').value;
        let damage = contentElement.querySelector('#daune').value;
        let price = contentElement.querySelector('#pret').value;
        let imgLink = contentElement.querySelector('#masina-img').value;

        if (name != "" && number != "" && model != "" && kilometers != null && year != "" && damage != "" && price != "" && imgLink != "") {
            let object = {
                id: newId,
                img: imgLink,
                model_name: model,
                seller: name,
                contact: number,
                kilometers: kilometers,
                year_of_purchase: year,
                damage: damage,
                price: price,
                verified: false
            }

            fetch('http://localhost:3000/cars', {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(object)
            }).then( function(response) {
                console.log("Adaugare facuta cu succes!");
                displayCarList();
            }) 
        } else {
            console.log("Toate campurile sunt obligatorii")
            if (submitWrong == false) {
                let warningText = document.createElement('b');
                warningText.innerText = "Toate câmpurile sunt obligatorii!";
                warningText.style.color = "red";
                contentElement.querySelector('#submit_form').appendChild(warningText);
                submitWrong = true;
            }
            
        }

        
    });
}

function getVerif() {
    
    let value = localStorage.getItem('Verif')
    console.log(`gettig ${value}`)
    if (value == null) {
        value = false;
        localStorage.setItem('Verif', value)
    }
    return value;
}

function setVerif(value) {
    console.log(`settig ${value}`)
    localStorage.setItem("Verif", value)
}

