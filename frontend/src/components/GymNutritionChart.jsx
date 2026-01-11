import React from 'react'

const GymNutritionChart = () => {
    const gymPlan = [
        { day: "Monday", workout: "Stretching & Yoga", duration: "30 min", focus: "Spine elongation & flexibility", notes: "Forward bends, cat-cow, cobra" },
        { day: "Monday", workout: "Strength Training", duration: "45 min", focus: "Legs & Core", notes: "Squats, lunges, planks" },
        { day: "Tuesday", workout: "Cardio & HIIT", duration: "30 min", focus: "Heart & stamina", notes: "Jump rope, sprints, burpees" },
        { day: "Wednesday", workout: "Rest / Light Stretching", duration: "20 min", focus: "Recovery", notes: "Focus on posture, foam rolling" },
        { day: "Thursday", workout: "Strength Training", duration: "45 min", focus: "Upper Body", notes: "Push-ups, pull-ups, dumbbell presses" },
        { day: "Friday", workout: "Yoga & Stretch", duration: "30 min", focus: "Flexibility & Spine", notes: "Hanging exercises, side stretches" },
        { day: "Saturday", workout: "Full Body Circuit", duration: "60 min", focus: "All muscles", notes: "Squats, lunges, push-ups, planks" },
        { day: "Sunday", workout: "Active Rest", duration: "20 min", focus: "Relaxation", notes: "Walk, light stretching" },
    ];

    const nutritionPlan = [
        { meal: "Breakfast", foods: "Milk, Eggs, Oats, Banana", benefits: "Protein, Calcium, Energy" },
        { meal: "Mid-Morning", foods: "Nuts (Almond, Walnut), Yogurt", benefits: "Healthy fats, Protein" },
        { meal: "Lunch", foods: "Brown rice, Chicken / Paneer / Lentils, Vegetables", benefits: "Protein + Fiber + Minerals" },
        { meal: "Afternoon Snack", foods: "Fruit smoothie, Peanut butter toast", benefits: "Vitamins & Protein" },
        { meal: "Dinner", foods: "Fish / Tofu / Eggs, Quinoa / Sweet potato, Veggies", benefits: "Muscle repair, Vitamins" },
        { meal: "Before Sleep", foods: "Milk or Cottage cheese", benefits: "Calcium, Growth hormone support" },
    ];

    return (
        <div className="p-4 md:p-8 lg:p-12 bg-black text-white min-h-screen">
            {/* Gym Plan */}
            <div className="max-w-6xl mx-auto mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">🏋️‍♂️ Gym & Height Gain Plan Chart</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-700 text-sm md:text-base">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2 px-3 border-r border-gray-700">Day</th>
                                <th className="py-2 px-3 border-r border-gray-700">Workout</th>
                                <th className="py-2 px-3 border-r border-gray-700">Duration</th>
                                <th className="py-2 px-3 border-r border-gray-700">Focus</th>
                                <th className="py-2 px-3">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gymPlan.map((item, index) => (
                                <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
                                    <td className="py-2 px-3 border-r border-gray-700">{item.day}</td>
                                    <td className="py-2 px-3 border-r border-gray-700">{item.workout}</td>
                                    <td className="py-2 px-3 border-r border-gray-700">{item.duration}</td>
                                    <td className="py-2 px-3 border-r border-gray-700">{item.focus}</td>
                                    <td className="py-2 px-3">{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Nutrition Plan */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">🍎 Nutrition Chart (Height & Muscle Gain)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-700 text-sm md:text-base">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2 px-3 border-r border-gray-700">Meal</th>
                                <th className="py-2 px-3 border-r border-gray-700">Foods</th>
                                <th className="py-2 px-3">Benefits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritionPlan.map((item, index) => (
                                <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
                                    <td className="py-2 px-3 border-r border-gray-700">{item.meal}</td>
                                    <td className="py-2 px-3 border-r border-gray-700">{item.foods}</td>
                                    <td className="py-2 px-3">{item.benefits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GymNutritionChart
