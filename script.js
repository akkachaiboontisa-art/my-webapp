// ===========================
// MathQuest - Game Engine
// ===========================

// ---------- GAME DATA ----------

const GRADES = [
    {
        id: "early-math",
        name: "Early Math",
        icon: "\u{1F331}",
        unlockCards: [],
        topics: [
            {
                id: "counting",
                name: "Counting",
                icon: "\u{1F522}",
                desc: "Count objects from 1 to 20",
                cardId: "counting",
                cardName: "Counting Card",
                cardIcon: "\u{1F522}",
                requiredCards: [],
                generate: function () {
                    const n = randInt(1, 20);
                    const options = [n, n + 1, n - 1, n + 2].filter(v => v >= 0);
                    const correct = n;
                    const display = "How many " + pick(["\u{1F34E}", "\u{1F34A}", "\u{1F353}", "\u{1F352}", "\u{1F351}"]) + " are there?";
                    const count = pick(options);
                    const emoji = pick(["\u{1F34E}", "\u{1F34A}", "\u{1F353}", "\u{1F352}", "\u{1F351}"]);
                    return { text: emoji.repeat(count), answer: count, label: "Count the items" };
                }
            },
            {
                id: "number-recognition",
                name: "Number Recognition",
                icon: "\u{1F4D6}",
                desc: "Identify numbers",
                cardId: "number-recognition",
                cardName: "Number Card",
                cardIcon: "\u{1F4D6}",
                requiredCards: [],
                generate: function () {
                    const a = randInt(1, 15);
                    const b = randInt(1, 15);
                    const op = pick(["+", "-"]);
                    if (op === "-") return { text: a + " - " + b + " = ?", answer: a - b, label: "Solve this" };
                    return { text: a + " + " + b + " = ?", answer: a + b, label: "Solve this" };
                }
            },
            {
                id: "comparing",
                name: "Comparing Numbers",
                icon: "\u{2721}",
                desc: "Compare numbers using >, <, =",
                cardId: "comparing",
                cardName: "Comparing Card",
                cardIcon: "\u{2721}",
                requiredCards: [],
                generate: function () {
                    const a = randInt(1, 20);
                    let b = randInt(1, 20);
                    while (b === a) b = randInt(1, 20);
                    return { text: a + " vs " + b + "\nWhich is bigger?", answer: Math.max(a, b), label: "Enter the larger number" };
                }
            }
        ]
    },
    {
        id: "kindergarten",
        name: "Kindergarten",
        icon: "\u{1F3EB}",
        unlockCards: ["counting"],
        topics: [
            {
                id: "k-counting-place",
                name: "Counting & Place Value",
                icon: "\u{1F4F1}",
                desc: "Count and understand place value",
                cardId: "k-counting-place",
                cardName: "Place Value Card",
                cardIcon: "\u{1F4F1}",
                requiredCards: ["counting"],
                generate: function () {
                    const tens = randInt(1, 5) * 10;
                    const ones = randInt(0, 9);
                    const total = tens + ones;
                    return { text: tens + " + " + ones + " = ?", answer: total, label: "Solve this" };
                }
            },
            {
                id: "k-addition",
                name: "Addition",
                icon: "\u{2795}",
                desc: "Add numbers within 10",
                cardId: "addition",
                cardName: "Addition Card",
                cardIcon: "\u{2795}",
                requiredCards: ["counting"],
                generate: function () {
                    const a = randInt(1, 9);
                    const b = randInt(1, 10 - a);
                    return { text: a + " + " + b + " = ?", answer: a + b, label: "Add these numbers" };
                }
            },
            {
                id: "k-subtraction",
                name: "Subtraction",
                icon: "\u{2796}",
                desc: "Subtract numbers within 10",
                cardId: "subtraction",
                cardName: "Subtraction Card",
                cardIcon: "\u{2796}",
                requiredCards: ["counting"],
                generate: function () {
                    const b = randInt(1, 8);
                    const a = randInt(b + 1, 10);
                    return { text: a + " - " + b + " = ?", answer: a - b, label: "Subtract these numbers" };
                }
            },
            {
                id: "k-shapes",
                name: "Shapes",
                icon: "\u{1F534}",
                desc: "Identify basic shapes",
                cardId: "shapes",
                cardName: "Shapes Card",
                cardIcon: "\u{1F534}",
                requiredCards: ["counting"],
                generate: function () {
                    const shapes = [
                        { name: "How many sides does a triangle have?", answer: 3 },
                        { name: "How many sides does a square have?", answer: 4 },
                        { name: "How many sides does a pentagon have?", answer: 5 },
                        { name: "How many corners does a triangle have?", answer: 3 },
                        { name: "How many corners does a rectangle have?", answer: 4 }
                    ];
                    const q = pick(shapes);
                    return { text: q.name, answer: q.answer, label: "Shape question" };
                }
            }
        ]
    },
    {
        id: "1st-grade",
        name: "1st Grade",
        icon: "\u{1F4DA}",
        unlockCards: ["addition", "subtraction"],
        topics: [
            {
                id: "1st-place-value",
                name: "Place Value",
                icon: "\u{1F4D1}",
                desc: "Tens and ones",
                cardId: "1st-place-value",
                cardName: "Tens & Ones Card",
                cardIcon: "\u{1F4D1}",
                requiredCards: ["addition"],
                generate: function () {
                    const tens = randInt(1, 9);
                    const ones = randInt(0, 9);
                    const total = tens * 10 + ones;
                    return { text: tens + " tens + " + ones + " ones = ?", answer: total, label: "What number is this?" };
                }
            },
            {
                id: "1st-add-sub-20",
                name: "Add & Subtract within 20",
                icon: "\u{1F4AF}",
                desc: "Addition and subtraction up to 20",
                cardId: "1st-add-sub-20",
                cardName: "Add/Sub 20 Card",
                cardIcon: "\u{1F4AF}",
                requiredCards: ["addition", "subtraction"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        const a = randInt(5, 15);
                        const b = randInt(1, 20 - a);
                        return { text: a + " + " + b + " = ?", answer: a + b, label: "Solve this" };
                    } else {
                        const b = randInt(1, 10);
                        const a = randInt(b + 1, 20);
                        return { text: a + " - " + b + " = ?", answer: a - b, label: "Solve this" };
                    }
                }
            },
            {
                id: "1st-data",
                name: "Measurement & Data",
                icon: "\u{1F4CF}",
                desc: "Length and weight basics",
                cardId: "1st-data",
                cardName: "Measurement Card",
                cardIcon: "\u{1F4CF}",
                requiredCards: ["addition"],
                generate: function () {
                    const questions = [
                        { text: "How many centimeters in 1 meter?", answer: 100 },
                        { text: "How many inches in 1 foot?", answer: 12 },
                        { text: "How many fingers on one hand?", answer: 5 },
                        { text: "How many weeks in 1 month (approx)?", answer: 4 }
                    ];
                    const q = pick(questions);
                    return { text: q.text, answer: q.answer, label: "Measurement" };
                }
            }
        ]
    },
    {
        id: "2nd-grade",
        name: "2nd Grade",
        icon: "\u{1F4D6}",
        unlockCards: ["1st-place-value", "1st-add-sub-20"],
        topics: [
            {
                id: "2nd-add-sub-20",
                name: "Add & Subtract within 20",
                icon: "\u{1F4AF}",
                desc: "Fluent addition and subtraction",
                cardId: "2nd-add-sub-20",
                cardName: "Mental Math Card",
                cardIcon: "\u{1F4AF}",
                requiredCards: ["1st-add-sub-20"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        const a = randInt(8, 18);
                        const b = randInt(1, 20 - a);
                        return { text: a + " + " + b + " = ?", answer: a + b, label: "Solve quickly!" };
                    } else {
                        const b = randInt(1, 12);
                        const a = randInt(b + 1, 20);
                        return { text: a + " - " + b + " = ?", answer: a - b, label: "Solve quickly!" };
                    }
                }
            },
            {
                id: "2nd-add-sub-100",
                name: "Add & Subtract within 100",
                icon: "\u{1F310}",
                desc: "Two-digit addition and subtraction",
                cardId: "2nd-add-sub-100",
                cardName: "100 Card",
                cardIcon: "\u{1F310}",
                requiredCards: ["1st-add-sub-20"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        const a = randInt(10, 80);
                        const b = randInt(5, 100 - a);
                        return { text: a + " + " + b + " = ?", answer: a + b, label: "Add within 100" };
                    } else {
                        const b = randInt(5, 40);
                        const a = randInt(b + 10, 100);
                        return { text: a + " - " + b + " = ?", answer: a - b, label: "Subtract within 100" };
                    }
                }
            },
            {
                id: "2nd-add-sub-1000",
                name: "Add & Subtract within 1000",
                icon: "\u{1F3E8}",
                desc: "Three-digit numbers",
                cardId: "2nd-add-sub-1000",
                cardName: "1000 Card",
                cardIcon: "\u{1F3E8}",
                requiredCards: ["1st-add-sub-20", "1st-place-value"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        const a = randInt(100, 700);
                        const b = randInt(50, 1000 - a);
                        return { text: a + " + " + b + " = ?", answer: a + b, label: "Add within 1000" };
                    } else {
                        const b = randInt(50, 300);
                        const a = randInt(b + 100, 1000);
                        return { text: a + " - " + b + " = ?", answer: a - b, label: "Subtract within 1000" };
                    }
                }
            },
            {
                id: "2nd-money",
                name: "Money & Time",
                icon: "\u{1F4B0}",
                desc: "Count coins and tell time",
                cardId: "2nd-money",
                cardName: "Money Card",
                cardIcon: "\u{1F4B0}",
                requiredCards: ["2nd-add-sub-100"],
                generate: function () {
                    const coins = [25, 10, 5, 1];
                    let total = 0;
                    let parts = [];
                    for (let i = 0; i < 3; i++) {
                        const c = pick(coins);
                        total += c;
                        parts.push(c + "c");
                    }
                    return { text: parts.join(" + ") + " = ? cents", answer: total, label: "Count the money" };
                }
            },
            {
                id: "2nd-geometry",
                name: "Geometry",
                icon: "\u{1F537}",
                desc: "Shapes and their properties",
                cardId: "2nd-geometry",
                cardName: "Geometry Card",
                cardIcon: "\u{1F537}",
                requiredCards: ["shapes"],
                generate: function () {
                    const questions = [
                        { text: "How many sides does a hexagon have?", answer: 6 },
                        { text: "How many sides does an octagon have?", answer: 8 },
                        { text: "How many faces does a cube have?", answer: 6 },
                        { text: "How many edges does a cube have?", answer: 12 },
                        { text: "How many vertices does a triangular prism have?", answer: 6 },
                        { text: "A rectangle has how many right angles?", answer: 4 }
                    ];
                    const q = pick(questions);
                    return { text: q.text, answer: q.answer, label: "Geometry" };
                }
            }
        ]
    },
    {
        id: "3rd-grade",
        name: "3rd Grade",
        icon: "\u{1F4DA}",
        unlockCards: ["2nd-add-sub-1000", "2nd-add-sub-100"],
        topics: [
            {
                id: "3rd-multiplication",
                name: "Intro to Multiplication",
                icon: "\u{2716}",
                desc: "Understand multiplication",
                cardId: "multiplication",
                cardName: "Multiplication Card",
                cardIcon: "\u{2716}",
                requiredCards: ["2nd-add-sub-20"],
                generate: function () {
                    const a = randInt(2, 10);
                    const b = randInt(2, 10);
                    return { text: a + " \u00D7 " + b + " = ?", answer: a * b, label: "Multiply" };
                }
            },
            {
                id: "3rd-1digit-mult",
                name: "1-Digit Multiplication",
                icon: "\u{2B22}",
                desc: "Multiply single digit numbers",
                cardId: "1digit-mult",
                cardName: "Single Digit Card",
                cardIcon: "\u{2B22}",
                requiredCards: ["multiplication"],
                generate: function () {
                    const a = randInt(2, 9);
                    const b = randInt(2, 9);
                    return { text: a + " \u00D7 " + b + " = ?", answer: a * b, label: "Multiply" };
                }
            },
            {
                id: "3rd-division",
                name: "Intro to Division",
                icon: "\u{2797}",
                desc: "Understand division",
                cardId: "division",
                cardName: "Division Card",
                cardIcon: "\u{2797}",
                requiredCards: ["multiplication"],
                generate: function () {
                    const b = randInt(2, 10);
                    const result = randInt(2, 10);
                    const a = b * result;
                    return { text: a + " \u00F7 " + b + " = ?", answer: result, label: "Divide" };
                }
            },
            {
                id: "3rd-fractions",
                name: "Understand Fractions",
                icon: "\u{1F96A}",
                desc: "Parts of a whole",
                cardId: "fractions",
                cardName: "Fractions Card",
                cardIcon: "\u{1F96A}",
                requiredCards: ["division"],
                generate: function () {
                    const d = pick([2, 3, 4, 5, 6, 8]);
                    const n = randInt(1, d - 1);
                    return { text: "What is " + n + "/" + d + " of " + d + "?", answer: n, label: "Find the part" };
                }
            },
            {
                id: "3rd-area",
                name: "Area & Perimeter",
                icon: "\u{1F4D0}",
                desc: "Calculate area and perimeter",
                cardId: "area-perimeter",
                cardName: "Area Card",
                cardIcon: "\u{1F4D0}",
                requiredCards: ["multiplication", "addition"],
                generate: function () {
                    const l = randInt(3, 12);
                    const w = randInt(2, 10);
                    if (Math.random() < 0.5) {
                        return { text: "Area of rectangle\n" + l + " \u00D7 " + w + " = ?", answer: l * w, label: "Area = length \u00D7 width" };
                    } else {
                        return { text: "Perimeter of rectangle\n" + l + " + " + w + " + " + l + " + " + w + " = ?", answer: 2 * (l + w), label: "Perimeter = 2(l + w)" };
                    }
                }
            },
            {
                id: "3rd-time",
                name: "Time",
                icon: "\u{23F0}",
                desc: "Tell time and elapsed time",
                cardId: "time",
                cardName: "Time Card",
                cardIcon: "\u{23F0}",
                requiredCards: ["addition"],
                generate: function () {
                    const questions = [
                        { text: "How many minutes in 1 hour?", answer: 60 },
                        { text: "How many hours in 1 day?", answer: 24 },
                        { text: "How many days in 1 week?", answer: 7 },
                        { text: "How many minutes in half an hour?", answer: 30 },
                        { text: "How many seconds in 1 minute?", answer: 60 }
                    ];
                    const q = pick(questions);
                    return { text: q.text, answer: q.answer, label: "Time" };
                }
            }
        ]
    },
    {
        id: "4th-grade",
        name: "4th Grade",
        icon: "\u{1F4D7}",
        unlockCards: ["multiplication", "1digit-mult", "division"],
        topics: [
            {
                id: "4th-mult-2digit",
                name: "Multiply by 2-Digit Numbers",
                icon: "\u{2716}\u{2716}",
                desc: "Multiply larger numbers",
                cardId: "2digit-mult",
                cardName: "Big Multiply Card",
                cardIcon: "\u{2716}\u{2716}",
                requiredCards: ["1digit-mult"],
                generate: function () {
                    const a = randInt(11, 25);
                    const b = randInt(2, 9);
                    return { text: a + " \u00D7 " + b + " = ?", answer: a * b, label: "Multiply" };
                }
            },
            {
                id: "4th-division",
                name: "Division",
                icon: "\u{2797}\u{2797}",
                desc: "Divide larger numbers",
                cardId: "4th-division",
                cardName: "Long Division Card",
                cardIcon: "\u{2797}\u{2797}",
                requiredCards: ["division"],
                generate: function () {
                    const b = randInt(2, 12);
                    const result = randInt(5, 20);
                    const a = b * result;
                    return { text: a + " \u00F7 " + b + " = ?", answer: result, label: "Divide" };
                }
            },
            {
                id: "4th-equiv-fractions",
                name: "Equivalent Fractions",
                icon: "\u{1F96A}",
                desc: "Find equivalent fractions",
                cardId: "equiv-fractions",
                cardName: "Equivalent Fractions Card",
                cardIcon: "\u{1F96A}",
                requiredCards: ["fractions"],
                generate: function () {
                    const base = pick([2, 3, 4, 5]);
                    const mult = randInt(2, 5);
                    const n = randInt(1, base - 1);
                    return { text: n + "/" + base + " = ?/" + (base * mult), answer: n * mult, label: "Find equivalent fraction" };
                }
            },
            {
                id: "4th-decimals",
                name: "Understand Decimals",
                icon: "\u{2731}",
                desc: "Decimal place value",
                cardId: "decimals",
                cardName: "Decimals Card",
                cardIcon: "\u{2731}",
                requiredCards: ["fractions"],
                generate: function () {
                    const whole = randInt(1, 9);
                    const tenths = randInt(1, 9);
                    const hundredths = randInt(0, 9);
                    const value = whole + tenths * 0.1 + hundredths * 0.01;
                    return { text: whole + " + " + tenths + "/10 + " + hundredths + "/100 = ?", answer: Math.round(value * 100) / 100, label: "Write as decimal" };
                }
            },
            {
                id: "4th-angles",
                name: "Measuring Angles",
                icon: "\u{1F4D0}",
                desc: "Understand angles",
                cardId: "angles",
                cardName: "Angles Card",
                cardIcon: "\u{1F4D0}",
                requiredCards: ["2nd-geometry"],
                generate: function () {
                    const questions = [
                        { text: "How many degrees in a right angle?", answer: 90 },
                        { text: "How many degrees in a straight line?", answer: 180 },
                        { text: "How many degrees in a full circle?", answer: 360 },
                        { text: "An acute angle is less than ? degrees", answer: 90 },
                        { text: "An obtuse angle is more than ? degrees", answer: 90 }
                    ];
                    const q = pick(questions);
                    return { text: q.text, answer: q.answer, label: "Angles" };
                }
            }
        ]
    },
    {
        id: "5th-grade",
        name: "5th Grade",
        icon: "\u{1F4D8}",
        unlockCards: ["2digit-mult", "4th-division", "equiv-fractions", "decimals"],
        topics: [
            {
                id: "5th-add-decimals",
                name: "Add Decimals",
                icon: "\u{2795}",
                desc: "Add numbers with decimals",
                cardId: "add-decimals",
                cardName: "Add Decimals Card",
                cardIcon: "\u{2795}",
                requiredCards: ["decimals"],
                generate: function () {
                    const a = Math.round((randInt(1, 9) + randInt(1, 9) * 0.1) * 10) / 10;
                    const b = Math.round((randInt(1, 9) + randInt(1, 9) * 0.1) * 10) / 10;
                    return { text: a + " + " + b + " = ?", answer: Math.round((a + b) * 10) / 10, label: "Add decimals" };
                }
            },
            {
                id: "5th-sub-decimals",
                name: "Subtract Decimals",
                icon: "\u{2796}",
                desc: "Subtract numbers with decimals",
                cardId: "sub-decimals",
                cardName: "Sub Decimals Card",
                cardIcon: "\u{2796}",
                requiredCards: ["decimals"],
                generate: function () {
                    const b = Math.round((randInt(1, 5) + randInt(1, 9) * 0.1) * 10) / 10;
                    const a = Math.round((randInt(6, 9) + randInt(1, 9) * 0.1) * 10) / 10;
                    return { text: a + " - " + b + " = ?", answer: Math.round((a - b) * 10) / 10, label: "Subtract decimals" };
                }
            },
            {
                id: "5th-mult-fractions",
                name: "Multiply Fractions",
                icon: "\u{2716}\u{1F96A}",
                desc: "Multiply fractions together",
                cardId: "mult-fractions",
                cardName: "Mult Fractions Card",
                cardIcon: "\u{2716}\u{1F96A}",
                requiredCards: ["equiv-fractions"],
                generate: function () {
                    const d1 = pick([2, 3, 4, 5]);
                    const n1 = randInt(1, d1 - 1);
                    const d2 = pick([2, 3, 4, 5]);
                    const n2 = randInt(1, d2 - 1);
                    const rn = n1 * n2;
                    const rd = d1 * d2;
                    const g = gcd(rn, rd);
                    return { text: n1 + "/" + d1 + " \u00D7 " + n2 + "/" + d2 + " = ?\n(Simplify if needed)", answer: rn / g + "/" + rd / g, label: "Multiply fractions (a/b)", type: "fraction" };
                }
            },
            {
                id: "5th-powers",
                name: "Powers of Ten",
                icon: "\u{26A1}",
                desc: "Multiply and divide by 10, 100, 1000",
                cardId: "powers",
                cardName: "Powers Card",
                cardIcon: "\u{26A1}",
                requiredCards: ["decimals"],
                generate: function () {
                    const base = randInt(1, 9);
                    const exp = pick([10, 100, 1000]);
                    const op = pick(["\u00D7", "\u00F7"]);
                    if (op === "\u00D7") {
                        return { text: base + " \u00D7 " + exp + " = ?", answer: base * exp, label: "Multiply by power of 10" };
                    } else {
                        const a = base * exp;
                        return { text: a + " \u00F7 " + exp + " = ?", answer: base, label: "Divide by power of 10" };
                    }
                }
            },
            {
                id: "5th-volume",
                name: "Volume",
                icon: "\u{1F4E6}",
                desc: "Calculate volume of rectangular prisms",
                cardId: "volume",
                cardName: "Volume Card",
                cardIcon: "\u{1F4E6}",
                requiredCards: ["area-perimeter"],
                generate: function () {
                    const l = randInt(2, 8);
                    const w = randInt(2, 8);
                    const h = randInt(2, 8);
                    return { text: "Volume: " + l + " \u00D7 " + w + " \u00D7 " + h + " = ?", answer: l * w * h, label: "V = l \u00D7 w \u00D7 h" };
                }
            }
        ]
    },
    {
        id: "6th-grade",
        name: "6th Grade",
        icon: "\u{1F4D9}",
        unlockCards: ["add-decimals", "sub-decimals", "mult-fractions", "powers"],
        topics: [
            {
                id: "6th-ratios",
                name: "Ratios",
                icon: "\u{2696}",
                desc: "Understand ratios",
                cardId: "ratios",
                cardName: "Ratios Card",
                cardIcon: "\u{2696}",
                requiredCards: ["multiplication"],
                generate: function () {
                    const a = randInt(2, 8);
                    const b = randInt(2, 8);
                    const total = a + b;
                    const part = randInt(1, total);
                    const answer = Math.round(a * part / total * 100) / 100;
                    return { text: "Ratio " + a + ":" + b + "\nIf total is " + total + ", what is part A?", answer: a, label: "Solve the ratio" };
                }
            },
            {
                id: "6th-percentages",
                name: "Rates & Percentages",
                icon: "\u{1F4CA}",
                desc: "Work with percentages",
                cardId: "percentages",
                cardName: "Percentages Card",
                cardIcon: "\u{1F4CA}",
                requiredCards: ["decimals", "multiplication"],
                generate: function () {
                    const pct = pick([10, 20, 25, 50, 75]);
                    const base = pick([40, 60, 80, 100, 200]);
                    return { text: pct + "% of " + base + " = ?", answer: pct * base / 100, label: "Find the percentage" };
                }
            },
            {
                id: "6th-exponents",
                name: "Exponents & Order of Operations",
                icon: "\u{1F4FF}",
                desc: "Powers and PEMDAS",
                cardId: "exponents",
                cardName: "Exponents Card",
                cardIcon: "\u{1F4FF}",
                requiredCards: ["powers"],
                generate: function () {
                    const base = randInt(2, 5);
                    const exp = randInt(2, 3);
                    return { text: base + "\u00B2\u207D" + "\u2070" + (exp === 3 ? "\u00B3" : "") + " = " + base + "^" + exp + " = ?", answer: Math.pow(base, exp), label: "Calculate the power" };
                }
            },
            {
                id: "6th-negatives",
                name: "Negative Numbers",
                icon: "\u{2796}",
                desc: "Add, subtract, multiply negatives",
                cardId: "negatives",
                cardName: "Negatives Card",
                cardIcon: "\u{2796}",
                requiredCards: ["addition", "subtraction"],
                generate: function () {
                    const a = randInt(-10, 10);
                    let b = randInt(-10, 10);
                    while (a + b === 0) b = randInt(-10, 10);
                    const op = pick(["+", "-"]);
                    if (op === "+") {
                        return { text: a + " + " + b + " = ?", answer: a + b, label: "Add integers" };
                    } else {
                        return { text: a + " - " + b + " = ?", answer: a - b, label: "Subtract integers" };
                    }
                }
            },
            {
                id: "6th-expressions",
                name: "Variables & Expressions",
                icon: "\u{1F4D2}",
                desc: "Algebraic expressions",
                cardId: "variables",
                cardName: "Variables Card",
                cardIcon: "\u{1F4D2}",
                requiredCards: ["multiplication", "addition"],
                generate: function () {
                    const x = randInt(2, 10);
                    const a = randInt(2, 8);
                    const b = randInt(1, 15);
                    return { text: "If x = " + x + ",\nwhat is " + a + "x + " + b + " = ?", answer: a * x + b, label: "Evaluate the expression" };
                }
            }
        ]
    },
    {
        id: "7th-grade",
        name: "7th Grade",
        icon: "\u{1F4DA}",
        unlockCards: ["ratios", "percentages", "exponents", "negatives"],
        topics: [
            {
                id: "7th-proportional",
                name: "Proportional Relationships",
                icon: "\u{1F4C8}",
                desc: "Work with proportions",
                cardId: "proportions",
                cardName: "Proportions Card",
                cardIcon: "\u{1F4C8}",
                requiredCards: ["ratios"],
                generate: function () {
                    const a = randInt(2, 6);
                    const b = randInt(2, 8);
                    const mult = randInt(2, 5);
                    return { text: a + "/" + b + " = ?/" + (b * mult), answer: a * mult, label: "Find the missing value" };
                }
            },
            {
                id: "7th-integers",
                name: "Integers: Add & Subtract",
                icon: "\u{2795}\u{2796}",
                desc: "Operations with integers",
                cardId: "integers",
                cardName: "Integers Card",
                cardIcon: "\u{2795}\u{2796}",
                requiredCards: ["negatives"],
                generate: function () {
                    const a = randInt(-15, 15);
                    const b = randInt(-15, 15);
                    if (Math.random() < 0.5) {
                        return { text: a + " + (" + b + ") = ?", answer: a + b, label: "Add integers" };
                    } else {
                        return { text: a + " - (" + b + ") = ?", answer: a - b, label: "Subtract integers" };
                    }
                }
            },
            {
                id: "7th-rational",
                name: "Rational Numbers: Add & Subtract",
                icon: "\u{1F96A}",
                desc: "Operations with fractions and decimals",
                cardId: "rational",
                cardName: "Rational Numbers Card",
                cardIcon: "\u{1F96A}",
                requiredCards: ["add-decimals", "sub-decimals"],
                generate: function () {
                    const a = Math.round((randInt(1, 5) + randInt(1, 9) * 0.1) * 10) / 10;
                    const b = Math.round((randInt(1, 5) + randInt(1, 9) * 0.1) * 10) / 10;
                    if (Math.random() < 0.5) {
                        return { text: a + " + " + b + " = ?", answer: Math.round((a + b) * 10) / 10, label: "Add decimals" };
                    } else {
                        return { text: a + " - " + b + " = ?", answer: Math.round((a - b) * 10) / 10, label: "Subtract decimals" };
                    }
                }
            },
            {
                id: "7th-mult-div-negatives",
                name: "Negatives: Multiply & Divide",
                icon: "\u{2716}\u{2796}",
                desc: "Multiply and divide negative numbers",
                cardId: "neg-mult-div",
                cardName: "Neg Mult/Div Card",
                cardIcon: "\u{2716}\u{2796}",
                requiredCards: ["negatives", "multiplication"],
                generate: function () {
                    const a = randInt(-8, 8) || 1;
                    const b = randInt(-8, 8) || 1;
                    if (Math.random() < 0.5) {
                        return { text: a + " \u00D7 " + b + " = ?", answer: a * b, label: "Multiply integers" };
                    } else {
                        const product = a * b;
                        return { text: product + " \u00F7 " + b + " = ?", answer: a, label: "Divide integers" };
                    }
                }
            },
            {
                id: "7th-equations",
                name: "Equations & Inequalities",
                icon: "\u{1F4D2}",
                desc: "Solve for x",
                cardId: "equations",
                cardName: "Equations Card",
                cardIcon: "\u{1F4D2}",
                requiredCards: ["variables", "negatives"],
                generate: function () {
                    const x = randInt(-10, 10);
                    const a = randInt(2, 8);
                    const b = randInt(1, 20);
                    const result = a * x + b;
                    return { text: a + "x + " + b + " = " + result + "\nx = ?", answer: x, label: "Solve for x" };
                }
            }
        ]
    },
    {
        id: "8th-grade",
        name: "8th Grade",
        icon: "\u{1F393}",
        unlockCards: ["proportions", "integers", "rational", "neg-mult-div", "equations"],
        topics: [
            {
                id: "8th-solve-unknown",
                name: "Solving Equations",
                icon: "\u{1F50D}",
                desc: "Multi-step equations",
                cardId: "solve-unknown",
                cardName: "Algebra Card",
                cardIcon: "\u{1F50D}",
                requiredCards: ["equations"],
                generate: function () {
                    const x = randInt(-8, 8);
                    const a = randInt(2, 6);
                    const b = randInt(1, 10);
                    const c = randInt(1, 10);
                    const result = a * x + b + c;
                    return { text: a + "x + " + b + " + " + c + " = " + result + "\nx = ?", answer: x, label: "Solve for x" };
                }
            },
            {
                id: "8th-linear",
                name: "Linear Equations",
                icon: "\u{1F4C8}",
                desc: "y = mx + b",
                cardId: "linear",
                cardName: "Linear Equations Card",
                cardIcon: "\u{1F4C8}",
                requiredCards: ["solve-unknown", "proportions"],
                generate: function () {
                    const m = randInt(1, 5);
                    const b = randInt(1, 10);
                    const x = randInt(1, 5);
                    const y = m * x + b;
                    return { text: "If y = " + m + "x + " + b + "\nand x = " + x + ", what is y?", answer: y, label: "Evaluate linear equation" };
                }
            },
            {
                id: "8th-systems",
                name: "Systems of Equations",
                icon: "\u{1F4D0}",
                desc: "Solve two equations together",
                cardId: "systems",
                cardName: "Systems Card",
                cardIcon: "\u{1F4D0}",
                requiredCards: ["linear", "equations"],
                generate: function () {
                    const x = randInt(1, 8);
                    const y = randInt(1, 8);
                    const a1 = randInt(1, 3);
                    const b1 = randInt(1, 3);
                    const a2 = randInt(1, 3);
                    const b2 = randInt(1, 3);
                    while (a1 * b2 === a2 * b1) return generateSystem();
                    const r1 = a1 * x + b1 * y;
                    const r2 = a2 * x + b2 * y;
                    return { text: "Solve for x:\n" + a1 + "x + " + b1 + "y = " + r1 + "\n" + a2 + "x + " + b2 + "y = " + r2 + "\nx = ?", answer: x, label: "Find x" };
                }
            },
            {
                id: "8th-exponents-ops",
                name: "Exponents & Roots",
                icon: "\u{221A}",
                desc: "Advanced exponent operations",
                cardId: "exponents-ops",
                cardName: "Exponents Ops Card",
                cardIcon: "\u{221A}",
                requiredCards: ["exponents"],
                generate: function () {
                    const base = randInt(2, 5);
                    const exp = pick([2, 3]);
                    const result = Math.pow(base, exp);
                    return { text: "What is the " + (exp === 2 ? "square" : "cube") + " root of " + result + "?", answer: base, label: "\u221A" + result + " = ?" };
                }
            }
        ]
    }
];

// ---------- GAME STATE ----------

let gameState = loadState();

function defaultState() {
    return {
        stars: 0,
        totalCorrect: 0,
        totalAttempts: 0,
        cards: [],
        completedTopics: [],
        topicStars: {}
    };
}

function loadState() {
    try {
        const s = localStorage.getItem("mathquest-state");
        return s ? JSON.parse(s) : defaultState();
    } catch (e) {
        return defaultState();
    }
}

function saveState() {
    try {
        localStorage.setItem("mathquest-state", JSON.stringify(gameState));
    } catch (e) { }
}

// ---------- HELPERS ----------

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
}

function getAllTopics() {
    const topics = [];
    GRADES.forEach(g => g.topics.forEach(t => topics.push({ ...t, gradeId: g.id })));
    return topics;
}

function findTopic(topicId) {
    for (const g of GRADES) {
        for (const t of g.topics) {
            if (t.id === topicId) return { topic: t, grade: g };
        }
    }
    return null;
}

function hasCard(cardId) {
    return gameState.cards.includes(cardId);
}

function ownsAllCards(cardIds) {
    return cardIds.every(c => hasCard(c));
}

function getLevel() {
    let level = 1;
    for (const g of GRADES) {
        for (const t of g.topics) {
            if (gameState.completedTopics.includes(t.id)) level++;
        }
    }
    return level;
}

// ---------- NAVIGATION ----------

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");

    if (screenId === "screen-home") refreshHome();
    if (screenId === "screen-play") renderGrades();
    if (screenId === "screen-cards") renderCards();
    if (screenId === "screen-progress") renderProgress();
}

function refreshHome() {
    document.getElementById("home-stars").textContent = gameState.stars;
    document.getElementById("home-cards").textContent = gameState.cards.length;
    document.getElementById("home-level").textContent = getLevel();
}

// ---------- GRADE SELECT ----------

function renderGrades() {
    const container = document.getElementById("grade-list");
    container.innerHTML = "";

    GRADES.forEach((grade, index) => {
        const unlocked = ownsAllCards(grade.unlockCards);
        const completedCount = grade.topics.filter(t => gameState.completedTopics.includes(t.id)).length;
        const isComplete = completedCount === grade.topics.length;

        const card = document.createElement("div");
        card.className = "grade-card" + (!unlocked ? " locked" : "") + (isComplete ? " completed" : "");
        card.innerHTML =
            '<div class="grade-card-icon">' + grade.icon + '</div>' +
            '<div class="grade-card-name">' + grade.name + '</div>' +
            '<div class="grade-card-progress">' + completedCount + '/' + grade.topics.length + ' topics</div>' +
            (!unlocked ? '<div class="lock-icon">\u{1F512}</div>' : '') +
            (isComplete ? '<div class="check-icon">\u{2705}</div>' : '');

        if (unlocked) {
            card.onclick = function () { openGrade(grade); };
        }

        container.appendChild(card);
    });
}

function openGrade(grade) {
    document.getElementById("topics-grade-title").textContent = grade.name;
    const container = document.getElementById("topic-list");
    container.innerHTML = "";

    grade.topics.forEach(topic => {
        const topicComplete = gameState.completedTopics.includes(topic.id);
        const cardsAvailable = ownsAllCards(topic.requiredCards);
        const locked = !cardsAvailable && !topicComplete;

        const item = document.createElement("div");
        item.className = "topic-item" + (locked ? " locked" : "") + (topicComplete ? " completed" : '');

        let badgeClass = "new";
        let badgeText = "Play";
        if (topicComplete) {
            badgeClass = "done";
            badgeText = "\u{2705} Done";
        } else if (locked) {
            badgeClass = "locked-badge";
            badgeText = "\u{1F512} Locked";
        }

        item.innerHTML =
            '<div class="topic-icon">' + topic.icon + '</div>' +
            '<div class="topic-info">' +
            '<div class="topic-name">' + topic.name + '</div>' +
            '<div class="topic-desc">' + topic.desc + '</div>' +
            '</div>' +
            '<div class="topic-badge ' + badgeClass + '">' + badgeText + '</div>';

        if (!locked) {
            item.onclick = function () { startTopic(topic); };
        }

        container.appendChild(item);
    });

    showScreen("screen-topics");
}

// ---------- GAME ----------

let currentTopic = null;
let currentProblem = null;
let problemsCorrect = 0;
let problemsAttempted = 0;
let problemsNeeded = 5;
let topicStarsEarned = 0;

function startTopic(topic) {
    currentTopic = topic;
    problemsCorrect = 0;
    problemsAttempted = 0;
    topicStarsEarned = 0;
    problemsNeeded = 5;

    document.getElementById("game-topic-name").textContent = topic.name;
    document.getElementById("game-stars").textContent = "0";
    updateGameProgress();

    renderRequiredCards();
    nextProblem();
    showScreen("screen-game");

    setTimeout(function () {
        document.getElementById("answer-input").focus();
    }, 400);
}

function renderRequiredCards() {
    const container = document.getElementById("required-cards");
    if (!currentTopic.requiredCards.length) {
        container.innerHTML = "";
        return;
    }
    let html = "";
    currentTopic.requiredCards.forEach(cardId => {
        const found = findTopicByCard(cardId);
        const owned = hasCard(cardId);
        html += '<div class="req-card' + (owned ? ' owned' : '') + '">' +
            '<span class="req-card-icon">' + (found ? found.topic.cardIcon : '?') + '</span>' +
            '<span>' + (found ? found.topic.cardName : cardId) + '</span>' +
            (owned ? ' \u{2705}' : ' \u{1F512}') +
            '</div>';
    });
    container.innerHTML = html;
}

function findTopicByCard(cardId) {
    for (const g of GRADES) {
        for (const t of g.topics) {
            if (t.cardId === cardId) return { topic: t, grade: g };
        }
    }
    return null;
}

function nextProblem() {
    if (problemsCorrect >= problemsNeeded) {
        completeTopic();
        return;
    }

    currentProblem = currentTopic.generate();
    document.getElementById("problem-text").textContent = currentProblem.text;
    document.getElementById("problem-label").textContent = currentProblem.label || "Solve this:";
    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "feedback";

    if (currentProblem.type === "fraction") {
        document.getElementById("answer-input").placeholder = "a/b";
        document.getElementById("answer-input").inputMode = "text";
    } else {
        document.getElementById("answer-input").placeholder = "Your answer...";
        document.getElementById("answer-input").inputMode = "decimal";
    }

    updateGameProgress();
}

function updateGameProgress() {
    const pct = Math.min(100, (problemsCorrect / problemsNeeded) * 100);
    document.getElementById("game-progress-fill").style.width = pct + "%";
    document.getElementById("game-progress-text").textContent = problemsCorrect + "/" + problemsNeeded;
}

function submitAnswer() {
    const input = document.getElementById("answer-input");
    const raw = input.value.trim();
    if (!raw) return;

    problemsAttempted++;
    let userAnswer;
    let correct = false;

    if (currentProblem.type === "fraction") {
        const parts = raw.split("/");
        if (parts.length === 2) {
            const num = parseInt(parts[0]);
            const den = parseInt(parts[1]);
            const expectedParts = String(currentProblem.answer).split("/");
            const expNum = parseInt(expectedParts[0]);
            const expDen = parseInt(expectedParts[1]);
            if (!isNaN(num) && !isNaN(den) && den !== 0) {
                const g1 = gcd(Math.abs(num), Math.abs(den));
                const g2 = gcd(Math.abs(expNum), Math.abs(expDen));
                correct = (num / g1 === expNum / g2 && den / g1 === expDen / g2);
                userAnswer = (num / g1) + "/" + (den / g1);
            }
        }
    } else {
        userAnswer = parseFloat(raw);
        correct = !isNaN(userAnswer) && Math.abs(userAnswer - currentProblem.answer) < 0.01;
    }

    const feedback = document.getElementById("feedback");
    const problemCard = document.getElementById("problem-card");

    if (correct) {
        problemsCorrect++;
        topicStarsEarned = problemsCorrect >= problemsNeeded ? 3 : problemsCorrect >= problemsNeeded - 1 ? 2 : problemsCorrect >= 3 ? 1 : 0;
        feedback.textContent = "\u{2705} Correct!";
        feedback.className = "feedback correct";
        problemCard.style.animation = "correctFlash 0.5s ease";
        gameState.totalCorrect++;
        updateGameProgress();
    } else {
        feedback.textContent = "\u{274C} Wrong! Answer: " + currentProblem.answer;
        feedback.className = "feedback wrong";
        problemCard.style.animation = "shake 0.4s ease";
    }

    gameState.totalAttempts++;
    gameState.stars += correct ? 1 : 0;
    document.getElementById("game-stars").textContent = gameState.stars;
    saveState();

    setTimeout(function () {
        problemCard.style.animation = "";
        nextProblem();
    }, correct ? 800 : 1800);
}

function exitGame() {
    showScreen("screen-topics");
}

// ---------- TOPIC COMPLETE ----------

function completeTopic() {
    const isNew = !gameState.completedTopics.includes(currentTopic.id);

    gameState.completedTopics.push(currentTopic.id);
    gameState.topicStars[currentTopic.id] = Math.max(gameState.topicStars[currentTopic.id] || 0, topicStarsEarned);

    if (isNew && !hasCard(currentTopic.cardId)) {
        gameState.cards.push(currentTopic.cardId);
    }

    saveState();

    document.getElementById("complete-topic-name").textContent = currentTopic.name;
    document.getElementById("complete-correct").textContent = problemsCorrect;
    document.getElementById("complete-stars-earned").textContent = topicStarsEarned;
    const acc = problemsAttempted > 0 ? Math.round((problemsCorrect / problemsAttempted) * 100) : 0;
    document.getElementById("complete-accuracy").textContent = acc + "%";

    document.getElementById("reward-card-icon").textContent = currentTopic.cardIcon;
    document.getElementById("reward-card-name").textContent = currentTopic.cardName;

    const stars = [document.getElementById("complete-star1"), document.getElementById("complete-star2"), document.getElementById("complete-star3")];
    stars.forEach(s => { s.className = "big-star"; });

    showScreen("screen-complete");

    stars.forEach(function (s, i) {
        if (i < topicStarsEarned) {
            setTimeout(function () { s.classList.add("earned"); }, 300 + i * 400);
        }
    });
}

// ---------- MY CARDS ----------

function renderCards() {
    const container = document.getElementById("cards-grid");
    container.innerHTML = "";

    GRADES.forEach(function (grade) {
        grade.topics.forEach(function (topic) {
            const owned = hasCard(topic.cardId);
            const item = document.createElement("div");
            item.className = "card-item" + (owned ? " owned" : " locked-card");
            item.innerHTML =
                '<div class="card-item-icon">' + topic.cardIcon + '</div>' +
                '<div class="card-item-name">' + topic.cardName + '</div>' +
                '<div class="card-item-topic">' + (owned ? grade.name : "\u{1F512} Locked") + '</div>';
            container.appendChild(item);
        });
    });
}

// ---------- PROGRESS ----------

function renderProgress() {
    const totalTopics = getAllTopics().length;
    const doneTopics = gameState.completedTopics.length;
    const topicPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
    const accPct = gameState.totalAttempts > 0 ? Math.round((gameState.totalCorrect / gameState.totalAttempts) * 100) : 0;

    document.querySelector("#ring-topics .ring-value").textContent = topicPct + "%";
    document.querySelector("#ring-problems .ring-value").textContent = gameState.totalCorrect;
    document.querySelector("#ring-accuracy .ring-value").textContent = accPct + "%";

    const container = document.getElementById("progress-grades");
    container.innerHTML = "";

    GRADES.forEach(function (grade) {
        const done = grade.topics.filter(function (t) { return gameState.completedTopics.includes(t.id); }).length;
        const pct = grade.topics.length > 0 ? Math.round((done / grade.topics.length) * 100) : 0;

        const item = document.createElement("div");
        item.className = "progress-grade-item";
        item.innerHTML =
            '<div class="progress-grade-header">' +
            '<span class="progress-grade-name">' + grade.icon + ' ' + grade.name + '</span>' +
            '<span class="progress-grade-pct">' + done + '/' + grade.topics.length + '</span>' +
            '</div>' +
            '<div class="progress-bar"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>';
        container.appendChild(item);
    });
}

// ---------- KEYBOARD SUPPORT ----------

document.getElementById("answer-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        submitAnswer();
    }
});

// ---------- INIT ----------

refreshHome();
