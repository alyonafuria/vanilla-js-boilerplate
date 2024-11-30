// Init TWA
Telegram.WebApp.ready();

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent("themeChanged", function () {
  document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Show main button
Telegram.WebApp.MainButton.setParams({
  text: "Main Button",
});
Telegram.WebApp.MainButton.onClick(function () {
  Telegram.WebApp.showAlert("Main Button was clicked");
});
Telegram.WebApp.MainButton.show();

// Function to call showPopup API
function showPopup() {
  Telegram.WebApp.showPopup(
    {
      title: "Title",
      message: "Some message",
      buttons: [
        { id: "link", type: "default", text: "Open ton.org" },
        { type: "cancel" },
      ],
    },
    function (btn) {
      if (btn === "link") {
        Telegram.WebApp.openLink("https://ton.org/");
      }
    }
  );
}

// Function to toggle main TWA button
function toggleMainButton() {
  if (Telegram.WebApp.MainButton.isVisible) {
    Telegram.WebApp.MainButton.hide();
  } else {
    Telegram.WebApp.MainButton.show();
  }
}

function setViewportData() {
  var sizeEl = document.getElementById("viewport-params-size");
  sizeEl.innerText = "width: " + window.innerWidth + " x " + "height: " + Telegram.WebApp.viewportStableHeight;

  var expandEl = document.querySelector("#viewport-params-expand");
  expandEl.innerText = "Is Expanded: " + (Telegram.WebApp.isExpanded ? "true" : "false");
}

Telegram.WebApp.setHeaderColor("secondary_bg_color");

setViewportData();
Telegram.WebApp.onEvent("viewportChanged", setViewportData);

Telegram.WebApp.onEvent("themeChanged", function () {
  document.body.setAttribute("style", "--bg-color:" + Telegram.WebApp.backgroundColor);
});

// New functions for token operations
function createToken() {
  document.getElementById('create-token-form').classList.toggle('hidden');
}

function transferTokens() {
  document.getElementById('transfer-token-form').classList.toggle('hidden');
}

// Function to show success message and create new token button
function showSuccessMessage() {
  document.getElementById('button-container').classList.add('hidden');
  document.getElementById('success-message').classList.remove('hidden');
}

// Function to create a new token
function createNewToken() {
  document.getElementById('button-container').classList.remove('hidden');
  document.getElementById('success-message').classList.add('hidden');
}

// Integrate StarkNet Libraries
import * as starknet from 'https://cdn.jsdelivr.net/npm/starknet@5.19.5/+esm';

const starkProvider = new starknet.SequencerProvider({
    baseUrl: starknet.constants.BaseUrl.SN_MAIN
});

async function getChainId() {
    const chainId = await starkProvider.getChainId();
    console.log("StarkNet Chain ID:", chainId);
}

getChainId();

// Function to deploy token
async function deployToken(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  const tokenName = document.getElementById('token-name').value;
  const tokenSymbol = document.getElementById('token-symbol').value;
  const tokenSupply = document.getElementById('token-supply').value;
  const tokenAddress = document.getElementById('token-address').value;

  const tokenData = {
    name: tokenName,
    symbol: tokenSymbol,
    supply: tokenSupply,
    address: tokenAddress,
  };

  try {
    const response = await fetch('YOUR_API_ENDPOINT_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenData),
    });

    if (response.ok) {
      console.log('Token deployed successfully');
      showSuccessMessage();
    } else {
      console.error('Failed to deploy token');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Adicione o event listener para o formulário
document.getElementById('create-token-form').addEventListener('submit', deployToken);