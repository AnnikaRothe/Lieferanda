let menus = [
  {
    id: "popular",
    headline: "Beliebt",
    name: "Veganizer",
    description:
      "Crispy Patty wie Chicken mit Knoblauch-Mayonnaise, karamellisierten Zwiebeln und Gurken",
    price: 8.5,
  },
  {
    name: "Cheesy One",
    description:
      "mit 100g No Meatorious Patty mit Secret-Burgersauce, Röstzwiebeln, Guacamole, Jalapenos, roten Zwiebeln und  veganem Cheese",
    price: 9.5,
  },
  {
    name: "Vilet-No-Vish",
    description:
      "mit knackigem Lollo-Salat, herzhafter Remoulade, BackVish, Cheeze und Gewürzgurken",
    price: 10.0,
  },
  {
    name: " Dip Garlicky ",
    description: "Ultra knoblauchige vegane Knoblauch-Mayo",
    price: 1.5,
  },
  {
    id: "combos",
    headline: "Combos",
    name: "Veganizer Combo",
    description:
      "Veganizer Burger mit Pommes und Dip nach Wahl plus 0,5L Getränk nach Wahl",
    price: 8.5,
  },
  {
    name: "Cheesy One Combo",
    description:
      "Cheesy One Burger mit Pommes und Dip nach Wahl plus 0,5L Getränk nach Wahl",
    price: 9.5,
  },
  {
    name: "Vilet-No-Vish Combo",
    description:
      "Vilet-No-Vish Burger mit Pommes und Dip nach Wahl plus 0,5L Getränk nach Wahl",
    price: 10.0,
  },
  {
    id: "dips",
    headline: "Dips",
    name: " Monkey Nut ",
    description: "Erdnusssauce",
    price: 1.5,
  },
  {
    name: " Dip Garlicky ",
    description: "Ultra knoblauchige vegane Knoblauch-Mayo",
    price: 1.5,
  },
];

let shoppingBasketName = []; //Leere Arrays werden initialisiert ohne Größenbeschränkung etc, sie können schrumpfen und wachsen anhand
let shoppingBasketPrice = []; // dessen, welche und wieviele Elemente hinzugefügt oder entnommen werden.
let shoppingBasketAmount = [];

function render() {
  let menuList = ""; // Initialisieren einer leeren Variablen, um den HTML-Inhalt der MenüListe zu speichern.
  for (let i = 0; i < menus.length; i++) {
    // Überprüft, ob das aktuelle Menüelement eine Überschrift hat.
    if (menus[i]["headline"]) {
      // Wenn ja, dann wird die Überschrift dem HTML-Element hinzugefügt.
      menuList += /*html*/ `
        <div class="headlineCategory" id="headline${i}">${menus[i]["headline"]}</div>
      `;
    }

    menuList += /*html*/ `
      <div class="menu">
        <div class="menuName">
          <div>${menus[i]["name"]}<img src="./img/i.png" alt="Info"></div> 
          <button class="plusButton" onclick="addToBasket(${i})">+</button>
        </div>
        <div class="description">${menus[i]["description"]} </div>
        <div>${menus[i]["price"].toFixed(2)} €</div>  
      </div>
    `;
  }
  // Hinzufügen des HTML-Inhalts plus gegebenenfalls der Menüüberschrift zum Element mit der ID "menuList"
  document.getElementById("menuList").innerHTML = menuList;
}

function renderBasket() {
  // Holt das Element mit der ID "shoppingCart" und überschreibt den HTML-Inhalt des Elements "shoppingCart" mit dem HTML-Code für den leeren Warenkorb.
  document.getElementById("shoppingCart").innerHTML = "";
  document.getElementById("shoppingCart").innerHTML = /*html*/ `
    <div class="shoppingCartHeadline">
            <h1>Warenkorb</h1>
          </div>
          <div id="cart">   
            <div class="shoppingBag">
              <img src="img/broPic1.png" />
            </div>
            <div>
              <h2>Fülle deinen Warenkorb</h2>
            </div>
            <div>
              Füge einige leckere Gerichte aus der Speisekarte hinzu und
              bestelle dein Essen.
            </div>
          </div>
    `;
}

function addToBasket(i) {
  // i dient als Index, um das entsprechende Menü aus dem Array menus zu identifizieren
  // Sucht im Warenkorb nach dem Namen des ausgewählten Menüs.
  let index = shoppingBasketName.indexOf(menus[i]["name"]); // Ermitteln des ersten Vorkommens des Namens des Menüs
  // Wenn das Menü noch nicht im Warenkorb ist, fügt die Funktion es hinzu.
  if (index == -1) {
    shoppingBasketName.push(menus[i]["name"]);
    shoppingBasketPrice.push(menus[i]["price"]);
    shoppingBasketAmount.push(1); //Anzahl 1 wird hinzugefügt beim Klicken auf entsprechendes Menü
    // Wenn das Menü bereits im Warenkorb ist, erhöht die Funktion die Menge um 1
  } else {
    shoppingBasketAmount[index]++; // [index] wird hier verwendet, um den Index des ersten Vorkommens des Menünamens im shoppingBasketName
  } // zu ermitteln
  showMenusInBasket();
}

function showMenusInBasket() {
  // Wenn der Warenkorb leer ist, rendert die Funktion "renderBasket" den leeren Warenkorb.
  if (shoppingBasketName.length == 0) {
    renderBasket();
    // Wenn der Warenkorb nicht leer ist, aktualisiert die Funktion "showMenusInBasket" den Warenkorb.
  } else {
    document.getElementById("cart").innerHTML = ""; // holt das HTML-Element mit der ID "cart" und leert den Inhalt, sodass die Anfangsanzeige
    // Geht durch jedes Element im Array und fügt es zum Warenkorb hinzu                        // nicht mehr angezeigt wird
    for (let i = 0; i < shoppingBasketName.length; i++) {
      document.getElementById("cart").innerHTML += /*html*/ `
      <div class="foodOrder">
      <span> <b>${shoppingBasketAmount[i]}</b>x</span> 
      <span> ${shoppingBasketName[i]} </span>
       <span>${shoppingBasketPrice[i].toFixed(2)} €</span>
      <div class="amountButtons">
      <button class="amountButton" onclick="plusAmount(${i})">+</button> 
      <button class="amountButton" onclick="minusAmount(${i})">-</button>
      <img class="amountButton" src="./img/trash.png" onclick="deleteWholeMenu(${i})" alt="Löschen">
      </div>
      </div> 
      `;
    }
    showPriceList();
  }
}

// Funktion zum Anzeigen und Aktualisieren der aktuellen Preisliste
function showPriceList() {
  let sum = 0; // initialisiere die Anfangssumme
  for (let i = 0; i < shoppingBasketPrice.length; i++) {
    /* Es wird in der Schleife durch jedes Element im shoppingBasketPrice-Array iteriert und 
    die Summe der Preise berechnet, indem der Preis jedes Elements im Warenkorb mit
    seiner Anzahl multipliziert und zur Gesamtsumme hinzugefügt wird. Die Anzahl 
    des Elements im Warenkorb wird aus dem shoppingBasketAmount-Array ausgelesen, 
    und die Position im Array wird durch den Index i bestimmt*/
    sum += shoppingBasketPrice[i] * shoppingBasketAmount[i];
  }
  let finalSum = sum + 3; // fügt Lieferkosten zur Summe hinzu

  // Fügt die Preisliste zum Warenkorb-HTML-Element hinzu
  document.getElementById("cart").innerHTML += /*html*/ `
  <div class="priceList">
  <div class="prices">
    <span>Zwischensumme</span> <span>${sum.toFixed(2)} €</span>
  </div>
  <div class="prices">
  <span>Lieferkosten</span> <span>${(3.0).toFixed(2)} €</span>
  </div>
  <div class="prices">
  <span>Gesamt</span> <b>${finalSum.toFixed(2)} €</b>
</div >

<button class="payButton" onclick= emptyBasketAfterOrder()>Bezahlen</button>`;
}

// Funktion zum Erhöhen der Anzahl eines Elements im Warenkorb anhand des Indexes
function plusAmount(i) {
  shoppingBasketAmount[i]++; // erhöht die Anzahl der Elemente im Warenkorb anhand des Indexes
  showMenusInBasket(); //Aktualisieren der Anzeige der Menus
}

// Funktion zum Verringern der Anzahl eines Elements im Warenkorb anhand des Indexes
function minusAmount(i) {
  //i dient als Index dafür, um das entsprechende Element im shoppingBasketAmount zu identifizieren
  let newAmount = shoppingBasketAmount[i]--; //shoppingBasketAmount[i] subtrahiert 1 von der aktuellen Anzahl im Warenkorb und weist das Ergebnis der Variablen newAmount zu
  // Wenn die neue Anzahl 1 ist, entferne das Element aus dem Warenkorb
  if (newAmount == 1) {
    //wenn die neue Anzahl im Warenkorb 1 ist,
    shoppingBasketName.splice([i], 1); // wird das Element komplett entfernt
    shoppingBasketPrice.splice([i], 1);
    shoppingBasketAmount.splice([i], 1);
  }
  showMenusInBasket(); // Funktion wird aufgerufen, um aktualisierten Warenkorb anzuzeigen
}

function deleteWholeMenu(i) {
  shoppingBasketName.splice(i, 1); // Löschen des kompletten Elements an der ausgewählten Position im Array "shoppingBasketName"
  shoppingBasketPrice.splice(i, 1);
  shoppingBasketAmount.splice(i, 1);
  showMenusInBasket();
}

// Damit die bestellten Menüs auch nach der Bestellung aus dem Warenkorb gelöscht werden, ohne die Seite refeshen zu müssen.
function emptyBasketAfterOrder() {
  shoppingBasketName = [];
  shoppingBasketPrice = [];
  shoppingBasketAmount = [];
  confirm("Wenn du Hunger hast, drück auf Ok! :)");
  // Seite wird nach Abschicken der Bestellung refresht
  location.reload();
}

function openMiniBasket() {
  // Die CSS Klasse Show wird mit Klicken auf den Button Warenkorb hinzugefügt
  document.getElementById("shoppingCart").classList.remove("d-none");
  document.getElementById("shoppingCart").classList.add("show");
  //Möglichkeit, um einzelne CSS Eigenschaften hinzuzufügen oder zu verändern
  document.getElementById("shoppingCart").style.display = "flex";
  // der X Button wird hinzugefügt, damit man die letzte Bestellseite verlassen kann auch ohne die Bestellung getätigt zu haben
  // und die Sachen dann trotzdem noch im Warenkorb drin sind
  document.getElementById("shoppingCart").innerHTML += `
  <img onclick= "closeMiniBasket()" class="x" src='./img/x.png'>`;
}
// Die CSS Klasse Show wird mit Klicken auf den Button X entfernt
function closeMiniBasket() {
  document.getElementById("shoppingCart").classList.remove("show");
  document.getElementById("shoppingCart").classList.add("d-none");
  render();
  renderBasket();
}

// Registriert eine Funktion, die bei Größenänderungen des Browserfensters ausgeführt wird
window.addEventListener("resize", function () {
  // Überprüft, ob die Breite des Fensters kleiner als 1150px ist
  if (this.window.innerWidth < 1150) {
    // Wenn die Bedingung erfüllt ist, fügt der HTML-Element-ID "shoppingCart" die Klasse "d-none" hinzu
    // Dadurch wird das Element ausgeblendet
    this.document.getElementById("shoppingCart").classList.add("d-none");
  }
});

// Registriert eine Funktion, die bei Größenänderungen des Browserfensters ausgeführt wird
window.addEventListener("resize", function () {
  // Überprüft, ob die Breite des Fensters größer als 1150px ist
  if (this.window.innerWidth > 1150) {
    // Wenn die Bedingung erfüllt ist, wird beim HTML-Element-ID "shoppingCart" die Klasse "d-none" entfernt
    // Dadurch wird das Element eingeblendet
    this.document.getElementById("shoppingCart").classList.remove("d-none");
  }
});
