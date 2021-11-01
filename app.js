// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // Hide results
  document.querySelector("#results").style.display = "none";
  // Show loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults(e) {
  // UI
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show results
    document.querySelector("#results").style.display = "block";
    // Hide loading
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Check your numbers");
    document.querySelector("#loading").style.display = "none";
  }
}

function showError(msg) {
  // Create div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text and append to div
  errorDiv.appendChild(document.createTextNode(msg));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear after 3 sec

  setTimeout(clearErr, 3000);
}

function clearErr() {
  document.querySelector(".alert").remove();
}
