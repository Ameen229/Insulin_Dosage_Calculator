// Function to calculate the total insulin dosage including remark dosage
function calculateInsulin() {
    const breakfast = parseFloat(document.getElementById("breakfast").value) || 0;
    const lunch = parseFloat(document.getElementById("lunch").value) || 0;
    const snacks = parseFloat(document.getElementById("snacks").value) || 0;
    const dinner = parseFloat(document.getElementById("dinner").value) || 0;
    const bedtime = parseFloat(document.getElementById("bedtime").value) || 0;
    const remark = parseFloat(document.getElementById("remark").value) || 0;
    
    const totalInsulin = breakfast + lunch + snacks + dinner + bedtime + remark;
    document.getElementById("result").innerText = `Total Insulin: ${totalInsulin} units`;
}

// Function to calculate the correction factor and correction dose.
// It computes the correction factor using the 1800 rule: 
// Correction Factor = 1800 / Total Daily Insulin Dose.
// Then, it calculates the correction dose based on current vs. target BG.
function calculateCorrection() {
    // Get the insulin inputs again to compute the total daily dose.
    const breakfast = parseFloat(document.getElementById("breakfast").value) || 0;
    const lunch = parseFloat(document.getElementById("lunch").value) || 0;
    const snacks = parseFloat(document.getElementById("snacks").value) || 0;
    const dinner = parseFloat(document.getElementById("dinner").value) || 0;
    const bedtime = parseFloat(document.getElementById("bedtime").value) || 0;
    const remark = parseFloat(document.getElementById("remark").value) || 0;
    
    const totalInsulin = breakfast + lunch + snacks + dinner + bedtime + remark;
    
    // If totalInsulin is zero, we cannot compute the correction factor.
    if (totalInsulin <= 0) {
        document.getElementById("correctionResult").innerText = "Please enter your insulin doses to compute the correction factor.";
        return;
    }
    
    // Calculate correction factor (mg/dL reduction per unit of insulin)
    const correctionFactor = 1800 / totalInsulin;
    
    // Get current and target blood glucose values.
    const currentBG = parseFloat(document.getElementById("currentBG").value) || 0;
    const targetBG = parseFloat(document.getElementById("targetBG").value) || 0;
    
    // Calculate correction dose if current BG is above target.
    let correctionDose = 0;
    if (currentBG > targetBG) {
        correctionDose = (currentBG - targetBG) / correctionFactor;
    }
    
    // Display the results.
    let output = `Total Daily Insulin: ${totalInsulin} units\n`;
    output += `Correction Factor: ${correctionFactor.toFixed(2)} mg/dL per unit\n`;
    output += correctionDose > 0 
              ? `Correction Dose: ${correctionDose.toFixed(2)} units`
              : "No correction needed.";
              
    document.getElementById("correctionResult").innerText = output;
}
