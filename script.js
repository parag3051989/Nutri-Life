document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmi-form');
    const resultSection = document.getElementById('result-section');
    const calculatorSection = document.getElementById('calculator-section');
    const resetBtn = document.getElementById('reset-btn');

    // Diet Plan Data
    const dietPlans = {
        underweight: {
            title: "Weight Gain Plan",
            breakfast: "2 eggs, avacado toast, banana smoothie",
            lunch: "Grilled chicken breast, brown rice, mixed veggies",
            snack: "Greek yogurt with honey and nuts",
            dinner: "Salmon with quinoa and asparagus"
        },
        normal: {
            title: "Balanced Maintenance Plan",
            breakfast: "Oatmeal with berries and chia seeds",
            lunch: "Turkey wrap with plenty of greens",
            snack: "Apple slices with almond butter",
            dinner: "Stir-fried tofu with broccoli and bell peppers"
        },
        overweight: {
            title: "Weight Loss Plan",
            breakfast: "Green tea, scrambled egg whites, spinach",
            lunch: "Large mixed salad with chickpeas and vinaigrette",
            snack: "Carrot sticks with hummus",
            dinner: "Baked white fish with steamed zucchini"
        },
        obese: {
            title: "Strict Calorie Deficit Plan",
            breakfast: "Black coffee, small bowl of fruit salad",
            lunch: "Grilled chicken salad (no creamy dressing)",
            snack: "Cucumber slices",
            dinner: "Vegetable soup with lentils"
        }
    };

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const heightInput = document.getElementById('height').value;
        const weightInput = document.getElementById('weight').value;

        if (heightInput && weightInput) {
            calculateAndDisplay(parseFloat(heightInput), parseFloat(weightInput));
        }
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        calculatorSection.style.display = 'block';
        bmiForm.reset();
        
        // Reset animation
        calculatorSection.style.opacity = '0';
        requestAnimationFrame(() => {
            calculatorSection.style.transition = 'opacity 0.5s ease';
            calculatorSection.style.opacity = '1';
        });
    });

    function calculateAndDisplay(heightCm, weightKg) {
        // Calculate BMI
        const heightM = heightCm / 100;
        const bmi = (weightKg / (heightM * heightM)).toFixed(1);
        
        // Determine Category & Plan
        let category = '';
        let plan = {};
        let colorClass = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            plan = dietPlans.underweight;
            colorClass = '#3498db'; // Blue
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal Weight';
            plan = dietPlans.normal;
            colorClass = '#2ecc71'; // Green
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            plan = dietPlans.overweight;
            colorClass = '#f1c40f'; // Yellow
        } else {
            category = 'Obese';
            plan = dietPlans.obese;
            colorClass = '#e74c3c'; // Red
        }

        // Update UI
        updateUI(bmi, category, plan, colorClass);
    }

    function updateUI(bmi, category, plan, color) {
        calculatorSection.style.display = 'none';
        resultSection.classList.remove('hidden');

        // Update Text
        document.getElementById('bmi-value').textContent = bmi;
        document.getElementById('bmi-value').style.color = color;
        
        document.getElementById('bmi-category').textContent = category;
        document.getElementById('bmi-category').style.background = color;
        document.getElementById('bmi-category').style.color = '#fff';

        // Update Diet Plan
        document.getElementById('breakfast-plan').textContent = plan.breakfast;
        document.getElementById('lunch-plan').textContent = plan.lunch;
        document.getElementById('snack-plan').textContent = plan.snack;
        document.getElementById('dinner-plan').textContent = plan.dinner;

        // Animation for result
        resultSection.style.opacity = '0';
        requestAnimationFrame(() => {
            resultSection.style.transition = 'opacity 0.5s ease';
            resultSection.style.opacity = '1';
        });
    }
});
