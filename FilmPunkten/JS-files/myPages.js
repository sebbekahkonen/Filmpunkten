function privateInformation() {
  $('.privateInfoDiv').remove();
  $('main').append(`
  <div class="privateInfoDiv">
    <div class="privateNameDiv">
      <label id="privateName">Namn:</label>
      <input type="Text" for="privateName" onClick='this.readOnly=false;'>
    </div>
    <div class="privateBirthdateDiv">
      <label id="privateBirthdate">Födelsedatum:</label>
      <input type="Text" for="privateBirthdate" onClick='this.readOnly=false;'>
    </div>
    <div class="privateEmailDiv">
      <label id="privateEmail">E-postadress:</label>
      <input type="Text" for="privateEmail" onClick='this.readOnly=false;'>
    </div>
    <div class="privateNumberDiv">
      <label id="privateNumber">Telefonnummer:</label>
      <input type="Text" for="privateNumber" onClick='this.readOnly=false;'>
    </div>
  </div>`)
}

function bookingInformation() {

}

function ongoingBookingInformation() {

}

function receiptsInformation() {

}

document.getElementById("privateInfo").addEventListener("click", privateInformation);
document.getElementById("bookingInfo").addEventListener("click", bookingInformation);
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);