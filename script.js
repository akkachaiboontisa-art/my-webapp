// ===========================
// MathQuest - Game Engine v2
// Step-by-step card picking
// ===========================

// ---------- HELPERS ----------

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
}

function frac(n, d) {
    var g = gcd(n, d);
    return (n / g) + "/" + (d / g);
}

// ---------- CARD DATABASE ----------

var ALL_CARDS = [
    { id: "counting", name: "Counting Card", icon: "\u{1F522}" },
    { id: "number-recognition", name: "Number Card", icon: "\u{1F4D6}" },
    { id: "comparing", name: "Comparing Card", icon: "\u{2721}" },
    { id: "k-counting-place", name: "Place Value Card", icon: "\u{1F4F1}" },
    { id: "addition", name: "Addition Card", icon: "\u{2795}" },
    { id: "subtraction", name: "Subtraction Card", icon: "\u{2796}" },
    { id: "shapes", name: "Shapes Card", icon: "\u{1F534}" },
    { id: "1st-place-value", name: "Tens & Ones Card", icon: "\u{1F4D1}" },
    { id: "1st-add-sub-20", name: "Add/Sub 20 Card", icon: "\u{1F4AF}" },
    { id: "1st-data", name: "Measurement Card", icon: "\u{1F4CF}" },
    { id: "2nd-add-sub-20", name: "Mental Math Card", icon: "\u{1F4AF}" },
    { id: "2nd-add-sub-100", name: "100 Card", icon: "\u{1F310}" },
    { id: "2nd-add-sub-1000", name: "1000 Card", icon: "\u{1F3E8}" },
    { id: "2nd-money", name: "Money Card", icon: "\u{1F4B0}" },
    { id: "2nd-geometry", name: "Geometry Card", icon: "\u{1F537}" },
    { id: "multiplication", name: "Multiplication Card", icon: "\u{2716}" },
    { id: "1digit-mult", name: "Single Digit Card", icon: "\u{2B22}" },
    { id: "division", name: "Division Card", icon: "\u{2797}" },
    { id: "fractions", name: "Fractions Card", icon: "\u{1F96A}" },
    { id: "area-perimeter", name: "Area Card", icon: "\u{1F4D0}" },
    { id: "time", name: "Time Card", icon: "\u{23F0}" },
    { id: "2digit-mult", name: "Big Multiply Card", icon: "\u{2716}\u{2716}" },
    { id: "4th-division", name: "Long Division Card", icon: "\u{2797}\u{2797}" },
    { id: "equiv-fractions", name: "Equiv. Fractions Card", icon: "\u{1F96A}" },
    { id: "decimals", name: "Decimals Card", icon: "\u{2731}" },
    { id: "angles", name: "Angles Card", icon: "\u{1F4D0}" },
    { id: "add-decimals", name: "Add Decimals Card", icon: "\u{2795}" },
    { id: "sub-decimals", name: "Sub Decimals Card", icon: "\u{2796}" },
    { id: "mult-fractions", name: "Mult Fractions Card", icon: "\u{2716}\u{1F96A}" },
    { id: "powers", name: "Powers Card", icon: "\u{26A1}" },
    { id: "volume", name: "Volume Card", icon: "\u{1F4E6}" },
    { id: "ratios", name: "Ratios Card", icon: "\u{2696}" },
    { id: "percentages", name: "Percentages Card", icon: "\u{1F4CA}" },
    { id: "exponents", name: "Exponents Card", icon: "\u{1F4FF}" },
    { id: "negatives", name: "Negatives Card", icon: "\u{2796}" },
    { id: "variables", name: "Variables Card", icon: "\u{1F4D2}" },
    { id: "proportions", name: "Proportions Card", icon: "\u{1F4C8}" },
    { id: "integers", name: "Integers Card", icon: "\u{2795}\u{2796}" },
    { id: "rational", name: "Rational Numbers Card", icon: "\u{1F96A}" },
    { id: "neg-mult-div", name: "Neg Mult/Div Card", icon: "\u{2716}\u{2796}" },
    { id: "equations", name: "Equations Card", icon: "\u{1F4D2}" },
    { id: "solve-unknown", name: "Algebra Card", icon: "\u{1F50D}" },
    { id: "linear", name: "Linear Equations Card", icon: "\u{1F4C8}" },
    { id: "systems", name: "Systems Card", icon: "\u{1F4D0}" },
    { id: "exponents-ops", name: "Exponents Ops Card", icon: "\u{221A}" }
];

function getCardInfo(cardId) {
    for (var i = 0; i < ALL_CARDS.length; i++) {
        if (ALL_CARDS[i].id === cardId) return ALL_CARDS[i];
    }
    return { id: cardId, name: cardId, icon: "?" };
}

// ---------- GRADE & TOPIC DATA ----------

var GRADES = [
    {
        id: "early-math", name: "Early Math", icon: "\u{1F331}",
        unlockCards: [],
        topics: [
            {
                id: "counting", name: "Counting", icon: "\u{1F522}",
                desc: "Count objects from 1 to 20",
                cardId: "counting", cardName: "Counting Card",
                requiredCards: [],
                generate: function () {
                    var emoji = pick(["\u{1F34E}", "\u{1F34A}", "\u{1F353}", "\u{1F352}", "\u{1F351}"]);
                    var count = randInt(2, 12);
                    var text = emoji.repeat(count);
                    return {
                        text: text, answer: count,
                        steps: [
                            {
                                requiredCard: "counting",
                                explanation: "Using the Counting Card:\n\nCount each " + emoji + " one by one:\n" + Array.from({length: count}, function(_, i) { return (i+1) + ". " + emoji; }).join("\n") + "\n\nTotal: " + count
                            }
                        ]
                    };
                }
            },
            {
                id: "number-recognition", name: "Number Recognition", icon: "\u{1F4D6}",
                desc: "Identify numbers",
                cardId: "number-recognition", cardName: "Number Card",
                requiredCards: [],
                generate: function () {
                    var a = randInt(1, 15);
                    var b = randInt(1, 15);
                    if (Math.random() < 0.5) {
                        return {
                            text: a + " + " + b + " = ?", answer: a + b,
                            steps: [
                                {
                                    requiredCard: "number-recognition",
                                    explanation: "Using the Number Card:\n\nWe need to add " + a + " and " + b + ".\n\n" + a + " + " + b + " = " + (a + b)
                                }
                            ]
                        };
                    } else {
                        var bigger = Math.max(a, b);
                        var smaller = Math.min(a, b);
                        return {
                            text: "Which is bigger?\n" + a + " or " + b, answer: bigger,
                            steps: [
                                {
                                    requiredCard: "number-recognition",
                                    explanation: "Using the Number Card:\n\nCompare " + a + " and " + b + ".\n\n" + bigger + " is larger than " + smaller + "."
                                }
                            ]
                        };
                    }
                }
            },
            {
                id: "comparing", name: "Comparing Numbers", icon: "\u{2721}",
                desc: "Compare numbers",
                cardId: "comparing", cardName: "Comparing Card",
                requiredCards: [],
                generate: function () {
                    var a = randInt(5, 25);
                    var b = randInt(1, 25);
                    while (b === a) b = randInt(1, 25);
                    var big = Math.max(a, b);
                    var small = Math.min(a, b);
                    return {
                        text: "Which is bigger?\n" + a + " or " + b, answer: big,
                        steps: [
                            {
                                requiredCard: "comparing",
                                explanation: "Using the Comparing Card:\n\nLine up the numbers:\n  " + a + "\n  " + b + "\n\n" + big + " is greater than " + small + "."
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "kindergarten", name: "Kindergarten", icon: "\u{1F3EB}",
        unlockCards: ["counting"],
        topics: [
            {
                id: "k-counting-place", name: "Counting & Place Value", icon: "\u{1F4F1}",
                desc: "Count and understand place value",
                cardId: "k-counting-place", cardName: "Place Value Card",
                requiredCards: ["counting"],
                generate: function () {
                    var tens = randInt(1, 5) * 10;
                    var ones = randInt(1, 9);
                    var total = tens + ones;
                    return {
                        text: tens + " + " + ones + " = ?", answer: total,
                        steps: [
                            {
                                requiredCard: "counting",
                                explanation: "Using the Counting Card:\n\nCount " + tens + " (which is " + (tens/10) + " tens)..."
                            },
                            {
                                requiredCard: "k-counting-place",
                                explanation: "Using the Place Value Card:\n\n" + tens + " = " + (tens/10) + " tens\n" + ones + " = " + ones + " ones\n\n" + tens + " + " + ones + " = " + total
                            }
                        ]
                    };
                }
            },
            {
                id: "k-addition", name: "Addition", icon: "\u{2795}",
                desc: "Add numbers within 10",
                cardId: "addition", cardName: "Addition Card",
                requiredCards: ["counting"],
                generate: function () {
                    var a = randInt(1, 8);
                    var b = randInt(1, 10 - a);
                    return {
                        text: a + " + " + b + " = ?", answer: a + b,
                        steps: [
                            {
                                requiredCard: "addition",
                                explanation: "Using the Addition Card:\n\nTo add " + a + " + " + b + ":\n\nStart at " + a + ", count up " + b + " more:\n" + a + " -> " + (a+1) + " -> " + (a+2) + " -> ... -> " + (a+b) + "\n\nAnswer: " + (a+b)
                            }
                        ]
                    };
                }
            },
            {
                id: "k-subtraction", name: "Subtraction", icon: "\u{2796}",
                desc: "Subtract numbers within 10",
                cardId: "subtraction", cardName: "Subtraction Card",
                requiredCards: ["counting"],
                generate: function () {
                    var b = randInt(1, 7);
                    var a = randInt(b + 1, 10);
                    return {
                        text: a + " - " + b + " = ?", answer: a - b,
                        steps: [
                            {
                                requiredCard: "subtraction",
                                explanation: "Using the Subtraction Card:\n\nTo subtract " + a + " - " + b + ":\n\nStart at " + a + ", count back " + b + ":\n" + a + " -> " + (a-1) + " -> " + (a-2) + " -> ... -> " + (a-b) + "\n\nAnswer: " + (a-b)
                            }
                        ]
                    };
                }
            },
            {
                id: "k-shapes", name: "Shapes", icon: "\u{1F534}",
                desc: "Identify basic shapes",
                cardId: "shapes", cardName: "Shapes Card",
                requiredCards: ["counting"],
                generate: function () {
                    var questions = [
                        { q: "How many sides does a triangle have?", a: 3, hint: "A triangle has 3 sides: side1, side2, side3" },
                        { q: "How many sides does a square have?", a: 4, hint: "A square has 4 equal sides" },
                        { q: "How many corners does a triangle have?", a: 3, hint: "A triangle has 3 corners (vertices)" },
                        { q: "How many corners does a rectangle have?", a: 4, hint: "A rectangle has 4 corners" }
                    ];
                    var item = pick(questions);
                    return {
                        text: item.q, answer: item.a,
                        steps: [
                            {
                                requiredCard: "shapes",
                                explanation: "Using the Shapes Card:\n\n" + item.hint + "."
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "1st-grade", name: "1st Grade", icon: "\u{1F4DA}",
        unlockCards: ["addition", "subtraction"],
        topics: [
            {
                id: "1st-place-value", name: "Place Value", icon: "\u{1F4D1}",
                desc: "Tens and ones",
                cardId: "1st-place-value", cardName: "Tens & Ones Card",
                requiredCards: ["addition"],
                generate: function () {
                    var tens = randInt(1, 9);
                    var ones = randInt(0, 9);
                    var total = tens * 10 + ones;
                    return {
                        text: tens + " tens + " + ones + " ones = ?", answer: total,
                        steps: [
                            {
                                requiredCard: "addition",
                                explanation: "Using the Addition Card:\n\n" + tens + " tens = " + tens + " \u00D7 10 = " + (tens*10)
                            },
                            {
                                requiredCard: "1st-place-value",
                                explanation: "Using the Tens & Ones Card:\n\n" + (tens*10) + " + " + ones + " = " + total + "\n\nSo " + tens + " tens and " + ones + " ones = " + total
                            }
                        ]
                    };
                }
            },
            {
                id: "1st-add-sub-20", name: "Add & Subtract within 20", icon: "\u{1F4AF}",
                desc: "Addition and subtraction up to 20",
                cardId: "1st-add-sub-20", cardName: "Add/Sub 20 Card",
                requiredCards: ["addition", "subtraction"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        var a = randInt(5, 14);
                        var b = randInt(1, 20 - a);
                        return {
                            text: a + " + " + b + " = ?", answer: a + b,
                            steps: [
                                {
                                    requiredCard: "addition",
                                    explanation: "Using the Addition Card:\n\n" + a + " + " + b + ":\nBreak " + b + " into parts to make 10:\n" + a + " + " + (10-a) + " = 10\n10 + " + (b-(10-a)) + " = " + (a+b)
                                }
                            ]
                        };
                    } else {
                        var b2 = randInt(1, 10);
                        var a2 = randInt(b2 + 1, 20);
                        return {
                            text: a2 + " - " + b2 + " = ?", answer: a2 - b2,
                            steps: [
                                {
                                    requiredCard: "subtraction",
                                    explanation: "Using the Subtraction Card:\n\n" + a2 + " - " + b2 + ":\nCount back " + b2 + " from " + a2 + ":\n" + a2 + " - " + b2 + " = " + (a2-b2)
                                }
                            ]
                        };
                    }
                }
            },
            {
                id: "1st-data", name: "Measurement & Data", icon: "\u{1F4CF}",
                desc: "Length and weight basics",
                cardId: "1st-data", cardName: "Measurement Card",
                requiredCards: ["addition"],
                generate: function () {
                    var questions = [
                        { q: "How many centimeters in 1 meter?", a: 100, hint: "1 meter = 100 centimeters" },
                        { q: "How many inches in 1 foot?", a: 12, hint: "1 foot = 12 inches" },
                        { q: "How many fingers on one hand?", a: 5, hint: "Count: thumb, index, middle, ring, pinky = 5" },
                        { q: "How many pennies make 5 cents?", a: 5, hint: "Each penny = 1 cent, so 5 cents = 5 pennies" }
                    ];
                    var item = pick(questions);
                    return {
                        text: item.q, answer: item.a,
                        steps: [
                            {
                                requiredCard: "1st-data",
                                explanation: "Using the Measurement Card:\n\n" + item.hint + "."
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "2nd-grade", name: "2nd Grade", icon: "\u{1F4D6}",
        unlockCards: ["1st-place-value", "1st-add-sub-20"],
        topics: [
            {
                id: "2nd-add-sub-20", name: "Add & Subtract within 20", icon: "\u{1F4AF}",
                desc: "Fluent addition and subtraction",
                cardId: "2nd-add-sub-20", cardName: "Mental Math Card",
                requiredCards: ["1st-add-sub-20"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        var a = randInt(8, 16);
                        var b = randInt(2, 20 - a);
                        return {
                            text: a + " + " + b + " = ?", answer: a + b,
                            steps: [
                                {
                                    requiredCard: "2nd-add-sub-20",
                                    explanation: "Using the Mental Math Card:\n\n" + a + " + " + b + "\nThink: " + a + " + " + (10-a+10) + " = " + (a+b) + "\n\nAnswer: " + (a+b)
                                }
                            ]
                        };
                    } else {
                        var b2 = randInt(2, 12);
                        var a2 = randInt(b2 + 2, 20);
                        return {
                            text: a2 + " - " + b2 + " = ?", answer: a2 - b2,
                            steps: [
                                {
                                    requiredCard: "2nd-add-sub-20",
                                    explanation: "Using the Mental Math Card:\n\n" + a2 + " - " + b2 + "\nThink: " + a2 + " - " + b2 + " = " + (a2-b2)
                                }
                            ]
                        };
                    }
                }
            },
            {
                id: "2nd-add-sub-100", name: "Add & Subtract within 100", icon: "\u{1F310}",
                desc: "Two-digit addition and subtraction",
                cardId: "2nd-add-sub-100", cardName: "100 Card",
                requiredCards: ["1st-add-sub-20"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        var a = randInt(12, 70);
                        var b = randInt(5, 100 - a);
                        return {
                            text: a + " + " + b + " = ?", answer: a + b,
                            steps: [
                                {
                                    requiredCard: "2nd-add-sub-100",
                                    explanation: "Using the 100 Card:\n\n" + a + " + " + b + "\n\nBreak it down:\n" + a + " + " + (Math.floor(b/10)*10) + " = " + (a + Math.floor(b/10)*10) + "\n" + (a + Math.floor(b/10)*10) + " + " + (b%10) + " = " + (a+b)
                                }
                            ]
                        };
                    } else {
                        var b2 = randInt(5, 40);
                        var a2 = randInt(b2 + 15, 100);
                        return {
                            text: a2 + " - " + b2 + " = ?", answer: a2 - b2,
                            steps: [
                                {
                                    requiredCard: "2nd-add-sub-100",
                                    explanation: "Using the 100 Card:\n\n" + a2 + " - " + b2 + "\n\nBreak it down:\n" + a2 + " - " + (Math.floor(b2/10)*10) + " = " + (a2 - Math.floor(b2/10)*10) + "\n" + (a2 - Math.floor(b2/10)*10) + " - " + (b2%10) + " = " + (a2-b2)
                                }
                            ]
                        };
                    }
                }
            },
            {
                id: "2nd-add-sub-1000", name: "Add & Subtract within 1000", icon: "\u{1F3E8}",
                desc: "Three-digit numbers",
                cardId: "2nd-add-sub-1000", cardName: "1000 Card",
                requiredCards: ["1st-add-sub-20", "1st-place-value"],
                generate: function () {
                    if (Math.random() < 0.5) {
                        var a = randInt(100, 600);
                        var b = randInt(50, 1000 - a);
                        return {
                            text: a + " + " + b + " = ?", answer: a + b,
                            steps: [
                                {
                                    requiredCard: "1st-place-value",
                                    explanation: "Using the Place Value Card:\n\n" + a + " has " + Math.floor(a/100) + " hundreds\n" + b + " has " + Math.floor(b/100) + " hundreds"
                                },
                                {
                                    requiredCard: "2nd-add-sub-1000",
                                    explanation: "Using the 1000 Card:\n\n" + a + " + " + b + " = " + (a+b)
                                }
                            ]
                        };
                    } else {
                        var b2 = randInt(50, 300);
                        var a2 = randInt(b2 + 100, 1000);
                        return {
                            text: a2 + " - " + b2 + " = ?", answer: a2 - b2,
                            steps: [
                                {
                                    requiredCard: "2nd-add-sub-1000",
                                    explanation: "Using the 1000 Card:\n\n" + a2 + " - " + b2 + "\n\nSubtract hundreds: " + Math.floor(a2/100)*100 + " - " + Math.floor(b2/100)*100 + "\nSubtract tens: " + (a2%100) + " - " + (b2%100) + "\nCombine: " + (a2-b2)
                                }
                            ]
                        };
                    }
                }
            },
            {
                id: "2nd-money", name: "Money & Time", icon: "\u{1F4B0}",
                desc: "Count coins and tell time",
                cardId: "2nd-money", cardName: "Money Card",
                requiredCards: ["2nd-add-sub-100"],
                generate: function () {
                    var coins = [25, 10, 5, 1];
                    var picked = [];
                    var total = 0;
                    for (var i = 0; i < 3; i++) {
                        var c = pick(coins);
                        picked.push(c);
                        total += c;
                    }
                    return {
                        text: picked[0] + "\u00A2 + " + picked[1] + "\u00A2 + " + picked[2] + "\u00A2 = ?\u00A2", answer: total,
                        steps: [
                            {
                                requiredCard: "2nd-money",
                                explanation: "Using the Money Card:\n\nAdd each coin:\n" + picked[0] + "\u00A2 + " + picked[1] + "\u00A2 = " + (picked[0]+picked[1]) + "\u00A2\n" + (picked[0]+picked[1]) + "\u00A2 + " + picked[2] + "\u00A2 = " + total + "\u00A2"
                            }
                        ]
                    };
                }
            },
            {
                id: "2nd-geometry", name: "Geometry", icon: "\u{1F537}",
                desc: "Shapes and their properties",
                cardId: "2nd-geometry", cardName: "Geometry Card",
                requiredCards: ["shapes"],
                generate: function () {
                    var questions = [
                        { q: "How many sides does a hexagon have?", a: 6, hint: "Hex- means 6" },
                        { q: "How many sides does an octagon have?", a: 8, hint: "Oct- means 8" },
                        { q: "How many faces does a cube have?", a: 6, hint: "A cube has 6 square faces" },
                        { q: "How many edges does a cube have?", a: 12, hint: "A cube has 12 edges (4+4+4)" }
                    ];
                    var item = pick(questions);
                    return {
                        text: item.q, answer: item.a,
                        steps: [
                            {
                                requiredCard: "shapes",
                                explanation: "Using the Shapes Card:\n\nThink about the shape...\n\n" + item.hint + "."
                            },
                            {
                                requiredCard: "2nd-geometry",
                                explanation: "Using the Geometry Card:\n\n" + item.hint + "\n\nAnswer: " + item.a
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "3rd-grade", name: "3rd Grade", icon: "\u{1F4DA}",
        unlockCards: ["2nd-add-sub-1000", "2nd-add-sub-100"],
        topics: [
            {
                id: "3rd-multiplication", name: "Intro to Multiplication", icon: "\u{2716}",
                desc: "Understand multiplication",
                cardId: "multiplication", cardName: "Multiplication Card",
                requiredCards: ["2nd-add-sub-20"],
                generate: function () {
                    var a = randInt(2, 8);
                    var b = randInt(2, 8);
                    var parts = [];
                    for (var i = 0; i < a; i++) parts.push(b);
                    return {
                        text: a + " \u00D7 " + b + " = ?", answer: a * b,
                        steps: [
                            {
                                requiredCard: "multiplication",
                                explanation: "Using the Multiplication Card:\n\n" + a + " \u00D7 " + b + " means adding " + b + " exactly " + a + " times:\n\n" + parts.join(" + ") + " = " + (a*b)
                            }
                        ]
                    };
                }
            },
            {
                id: "3rd-1digit-mult", name: "1-Digit Multiplication", icon: "\u{2B22}",
                desc: "Multiply single digit numbers",
                cardId: "1digit-mult", cardName: "Single Digit Card",
                requiredCards: ["multiplication"],
                generate: function () {
                    var a = randInt(2, 9);
                    var b = randInt(2, 9);
                    return {
                        text: a + " \u00D7 " + b + " = ?", answer: a * b,
                        steps: [
                            {
                                requiredCard: "multiplication",
                                explanation: "Using the Multiplication Card:\n\n" + a + " \u00D7 " + b + ":\n" + a + " groups of " + b
                            },
                            {
                                requiredCard: "1digit-mult",
                                explanation: "Using the Single Digit Card:\n\n" + a + " \u00D7 " + b + " = " + (a*b)
                            }
                        ]
                    };
                }
            },
            {
                id: "3rd-division", name: "Intro to Division", icon: "\u{2797}",
                desc: "Understand division",
                cardId: "division", cardName: "Division Card",
                requiredCards: ["multiplication"],
                generate: function () {
                    var b = randInt(2, 8);
                    var result = randInt(2, 9);
                    var a = b * result;
                    return {
                        text: a + " \u00F7 " + b + " = ?", answer: result,
                        steps: [
                            {
                                requiredCard: "division",
                                explanation: "Using the Division Card:\n\n" + a + " \u00F7 " + b + " means splitting " + a + " into groups of " + b + "."
                            },
                            {
                                requiredCard: "multiplication",
                                explanation: "Using the Multiplication Card:\n\nThink: what \u00D7 " + b + " = " + a + "?\n\n" + result + " \u00D7 " + b + " = " + a + "\n\nSo " + a + " \u00F7 " + b + " = " + result
                            }
                        ]
                    };
                }
            },
            {
                id: "3rd-fractions", name: "Understand Fractions", icon: "\u{1F96A}",
                desc: "Parts of a whole",
                cardId: "fractions", cardName: "Fractions Card",
                requiredCards: ["division"],
                generate: function () {
                    var d = pick([2, 3, 4, 5, 6, 8]);
                    var n = randInt(1, d - 1);
                    return {
                        text: "What is " + n + "/" + d + " of " + d + "?", answer: n,
                        steps: [
                            {
                                requiredCard: "division",
                                explanation: "Using the Division Card:\n\n" + n + "/" + d + " of " + d + "\nmeans " + n + " \u00D7 (" + d + " \u00F7 " + d + ")"
                            },
                            {
                                requiredCard: "fractions",
                                explanation: "Using the Fractions Card:\n\n" + n + "/" + d + " of " + d + "\n= " + n + " \u00D7 1\n= " + n + "\n\nWhen the denominator matches the whole number,\nthe answer is just the numerator!"
                            }
                        ]
                    };
                }
            },
            {
                id: "3rd-area", name: "Area & Perimeter", icon: "\u{1F4D0}",
                desc: "Calculate area and perimeter",
                cardId: "area-perimeter", cardName: "Area Card",
                requiredCards: ["multiplication", "addition"],
                generate: function () {
                    var l = randInt(4, 12);
                    var w = randInt(3, 10);
                    if (Math.random() < 0.5) {
                        return {
                            text: "Area of rectangle\n" + l + " \u00D7 " + w + " = ?", answer: l * w,
                            steps: [
                                {
                                    requiredCard: "area-perimeter",
                                    explanation: "Using the Area Card:\n\nArea = length \u00D7 width\n\n" + l + " \u00D7 " + w + " = " + (l*w)
                                }
                            ]
                        };
                    } else {
                        var peri = 2 * (l + w);
                        return {
                            text: "Perimeter of rectangle\nl=" + l + ", w=" + w + "\n2\u00D7(" + l + "+" + w + ") = ?", answer: peri,
                            steps: [
                                {
                                    requiredCard: "addition",
                                    explanation: "Using the Addition Card:\n\nPerimeter = 2 \u00D7 (length + width)\n\nFirst: " + l + " + " + w + " = " + (l+w)
                                },
                                {
                                    requiredCard: "area-perimeter",
                                    explanation: "Using the Area Card:\n\nThen: 2 \u00D7 " + (l+w) + " = " + peri + "\n\nPerimeter = " + peri
                                }
                            ]
                        };
                    }
                }
            },
            {
                id: "3rd-time", name: "Time", icon: "\u{23F0}",
                desc: "Tell time and elapsed time",
                cardId: "time", cardName: "Time Card",
                requiredCards: ["addition"],
                generate: function () {
                    var questions = [
                        { q: "How many minutes in 1 hour?", a: 60, hint: "1 hour = 60 minutes" },
                        { q: "How many hours in 1 day?", a: 24, hint: "1 day = 24 hours" },
                        { q: "How many days in 1 week?", a: 7, hint: "1 week = 7 days" },
                        { q: "How many minutes in half an hour?", a: 30, hint: "Half of 60 = 30 minutes" },
                        { q: "How many seconds in 1 minute?", a: 60, hint: "1 minute = 60 seconds" }
                    ];
                    var item = pick(questions);
                    return {
                        text: item.q, answer: item.a,
                        steps: [
                            {
                                requiredCard: "time",
                                explanation: "Using the Time Card:\n\n" + item.hint + "."
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "4th-grade", name: "4th Grade", icon: "\u{1F4D7}",
        unlockCards: ["multiplication", "1digit-mult", "division"],
        topics: [
            {
                id: "4th-mult-2digit", name: "Multiply by 2-Digit Numbers", icon: "\u{2716}\u{2716}",
                desc: "Multiply larger numbers",
                cardId: "2digit-mult", cardName: "Big Multiply Card",
                requiredCards: ["1digit-mult"],
                generate: function () {
                    var a = randInt(12, 25);
                    var b = randInt(2, 9);
                    var tens = Math.floor(a / 10) * 10;
                    var ones = a % 10;
                    return {
                        text: a + " \u00D7 " + b + " = ?", answer: a * b,
                        steps: [
                            {
                                requiredCard: "multiplication",
                                explanation: "Using the Multiplication Card:\n\nBreak " + a + " into tens and ones:\n" + tens + " + " + ones + " = " + a
                            },
                            {
                                requiredCard: "2digit-mult",
                                explanation: "Using the Big Multiply Card:\n\n" + tens + " \u00D7 " + b + " = " + (tens*b) + "\n" + ones + " \u00D7 " + b + " = " + (ones*b) + "\n\n" + (tens*b) + " + " + (ones*b) + " = " + (a*b)
                            }
                        ]
                    };
                }
            },
            {
                id: "4th-division", name: "Division", icon: "\u{2797}\u{2797}",
                desc: "Divide larger numbers",
                cardId: "4th-division", cardName: "Long Division Card",
                requiredCards: ["division"],
                generate: function () {
                    var b = randInt(3, 12);
                    var result = randInt(5, 20);
                    var a = b * result;
                    return {
                        text: a + " \u00F7 " + b + " = ?", answer: result,
                        steps: [
                            {
                                requiredCard: "division",
                                explanation: "Using the Division Card:\n\n" + a + " \u00F7 " + b + "\n\nHow many groups of " + b + " fit in " + a + "?"
                            },
                            {
                                requiredCard: "4th-division",
                                explanation: "Using the Long Division Card:\n\nThink: ? \u00D7 " + b + " = " + a + "\n\n" + result + " \u00D7 " + b + " = " + a + "\n\nAnswer: " + result
                            }
                        ]
                    };
                }
            },
            {
                id: "4th-equiv-fractions", name: "Equivalent Fractions", icon: "\u{1F96A}",
                desc: "Find equivalent fractions",
                cardId: "equiv-fractions", cardName: "Equiv. Fractions Card",
                requiredCards: ["fractions"],
                generate: function () {
                    var base = pick([2, 3, 4, 5]);
                    var mult = randInt(2, 4);
                    var n = randInt(1, base - 1);
                    return {
                        text: n + "/" + base + " = ?/" + (base * mult), answer: n * mult,
                        steps: [
                            {
                                requiredCard: "fractions",
                                explanation: "Using the Fractions Card:\n\nTo find an equivalent fraction,\nmultiply both top and bottom by the same number.\n\nDenominator: " + base + " \u00D7 " + mult + " = " + (base*mult)
                            },
                            {
                                requiredCard: "equiv-fractions",
                                explanation: "Using the Equiv. Fractions Card:\n\nNumerator: " + n + " \u00D7 " + mult + " = " + (n*mult) + "\n\nSo " + n + "/" + base + " = " + (n*mult) + "/" + (base*mult)
                            }
                        ]
                    };
                }
            },
            {
                id: "4th-decimals", name: "Understand Decimals", icon: "\u{2731}",
                desc: "Decimal place value",
                cardId: "decimals", cardName: "Decimals Card",
                requiredCards: ["fractions"],
                generate: function () {
                    var whole = randInt(1, 9);
                    var tenths = randInt(1, 9);
                    var hundredths = randInt(0, 9);
                    var result = whole + tenths * 0.1 + hundredths * 0.01;
                    result = Math.round(result * 100) / 100;
                    return {
                        text: whole + " + " + tenths + "/10 + " + hundredths + "/100 = ?", answer: result,
                        steps: [
                            {
                                requiredCard: "fractions",
                                explanation: "Using the Fractions Card:\n\n" + tenths + "/10 = 0." + tenths + "\n" + hundredths + "/100 = 0.0" + hundredths
                            },
                            {
                                requiredCard: "decimals",
                                explanation: "Using the Decimals Card:\n\n" + whole + " + 0." + tenths + " + 0.0" + hundredths + " = " + result
                            }
                        ]
                    };
                }
            },
            {
                id: "4th-angles", name: "Measuring Angles", icon: "\u{1F4D0}",
                desc: "Understand angles",
                cardId: "angles", cardName: "Angles Card",
                requiredCards: ["2nd-geometry"],
                generate: function () {
                    var questions = [
                        { q: "How many degrees in a right angle?", a: 90, hint: "A right angle is exactly 90\u00B0" },
                        { q: "How many degrees in a straight line?", a: 180, hint: "A straight angle = 180\u00B0" },
                        { q: "How many degrees in a full circle?", a: 360, hint: "A full rotation = 360\u00B0" },
                        { q: "An acute angle is less than ? degrees", a: 90, hint: "Acute angles are between 0\u00B0 and 90\u00B0" }
                    ];
                    var item = pick(questions);
                    return {
                        text: item.q, answer: item.a,
                        steps: [
                            {
                                requiredCard: "angles",
                                explanation: "Using the Angles Card:\n\n" + item.hint + "."
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "5th-grade", name: "5th Grade", icon: "\u{1F4D8}",
        unlockCards: ["2digit-mult", "4th-division", "equiv-fractions", "decimals"],
        topics: [
            {
                id: "5th-add-decimals", name: "Add Decimals", icon: "\u{2795}",
                desc: "Add numbers with decimals",
                cardId: "add-decimals", cardName: "Add Decimals Card",
                requiredCards: ["decimals"],
                generate: function () {
                    var a = Math.round((randInt(1, 8) + randInt(1, 9) * 0.1) * 10) / 10;
                    var b = Math.round((randInt(1, 8) + randInt(1, 9) * 0.1) * 10) / 10;
                    var ans = Math.round((a + b) * 10) / 10;
                    return {
                        text: a + " + " + b + " = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "decimals",
                                explanation: "Using the Decimals Card:\n\nAlign the decimal points:\n  " + a + "\n+ " + b
                            },
                            {
                                requiredCard: "add-decimals",
                                explanation: "Using the Add Decimals Card:\n\nAdd each column:\n" + a + " + " + b + " = " + ans
                            }
                        ]
                    };
                }
            },
            {
                id: "5th-sub-decimals", name: "Subtract Decimals", icon: "\u{2796}",
                desc: "Subtract numbers with decimals",
                cardId: "sub-decimals", cardName: "Sub Decimals Card",
                requiredCards: ["decimals"],
                generate: function () {
                    var b = Math.round((randInt(1, 4) + randInt(1, 9) * 0.1) * 10) / 10;
                    var a = Math.round((randInt(5, 9) + randInt(1, 9) * 0.1) * 10) / 10;
                    var ans = Math.round((a - b) * 10) / 10;
                    return {
                        text: a + " - " + b + " = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "decimals",
                                explanation: "Using the Decimals Card:\n\nAlign the decimal points:\n  " + a + "\n- " + b
                            },
                            {
                                requiredCard: "sub-decimals",
                                explanation: "Using the Sub Decimals Card:\n\nSubtract each column:\n" + a + " - " + b + " = " + ans
                            }
                        ]
                    };
                }
            },
            {
                id: "5th-powers", name: "Powers of Ten", icon: "\u{26A1}",
                desc: "Multiply and divide by 10, 100, 1000",
                cardId: "powers", cardName: "Powers Card",
                requiredCards: ["decimals"],
                generate: function () {
                    var base = randInt(2, 8);
                    var exp = pick([10, 100, 1000]);
                    var result = base * exp;
                    return {
                        text: base + " \u00D7 " + exp + " = ?", answer: result,
                        steps: [
                            {
                                requiredCard: "decimals",
                                explanation: "Using the Decimals Card:\n\nMultiplying by " + exp + " shifts the digits " + (exp === 10 ? 1 : exp === 100 ? 2 : 3) + " places to the left."
                            },
                            {
                                requiredCard: "powers",
                                explanation: "Using the Powers Card:\n\n" + base + " \u00D7 " + exp + ":\n" + base + " + " + (exp === 10 ? "0" : "00") + (exp === 1000 ? "0" : "") + " = " + result
                            }
                        ]
                    };
                }
            },
            {
                id: "5th-volume", name: "Volume", icon: "\u{1F4E6}",
                desc: "Calculate volume of rectangular prisms",
                cardId: "volume", cardName: "Volume Card",
                requiredCards: ["area-perimeter"],
                generate: function () {
                    var l = randInt(2, 7);
                    var w = randInt(2, 6);
                    var h = randInt(2, 5);
                    var area = l * w;
                    return {
                        text: "Volume: " + l + " \u00D7 " + w + " \u00D7 " + h + " = ?", answer: l * w * h,
                        steps: [
                            {
                                requiredCard: "area-perimeter",
                                explanation: "Using the Area Card:\n\nFirst find the base area:\n" + l + " \u00D7 " + w + " = " + area
                            },
                            {
                                requiredCard: "volume",
                                explanation: "Using the Volume Card:\n\nVolume = base area \u00D7 height\n\n" + area + " \u00D7 " + h + " = " + (l*w*h)
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "6th-grade", name: "6th Grade", icon: "\u{1F4D9}",
        unlockCards: ["add-decimals", "sub-decimals", "powers"],
        topics: [
            {
                id: "6th-ratios", name: "Ratios", icon: "\u{2696}",
                desc: "Understand ratios",
                cardId: "ratios", cardName: "Ratios Card",
                requiredCards: ["multiplication"],
                generate: function () {
                    var a = randInt(2, 6);
                    var b = randInt(2, 6);
                    return {
                        text: "Ratio " + a + ":" + b + "\nSimplify to lowest terms", answer: frac(a, b),
                        type: "fraction",
                        steps: [
                            {
                                requiredCard: "ratios",
                                explanation: "Using the Ratios Card:\n\nThe ratio " + a + ":" + b + "\n\nFind GCD of " + a + " and " + b + ": " + gcd(a, b) + "\n\nSimplify: " + a + "/" + gcd(a, b) + " : " + b + "/" + gcd(a, b) + "\n= " + frac(a, b)
                            }
                        ]
                    };
                }
            },
            {
                id: "6th-percentages", name: "Rates & Percentages", icon: "\u{1F4CA}",
                desc: "Work with percentages",
                cardId: "percentages", cardName: "Percentages Card",
                requiredCards: ["decimals", "multiplication"],
                generate: function () {
                    var pct = pick([10, 20, 25, 50, 75]);
                    var base = pick([40, 60, 80, 100, 200]);
                    var ans = pct * base / 100;
                    return {
                        text: pct + "% of " + base + " = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "multiplication",
                                explanation: "Using the Multiplication Card:\n\n" + pct + "% means " + pct + " per 100.\n\nConvert: " + pct + "% = " + pct + "/100 = " + (pct/100)
                            },
                            {
                                requiredCard: "percentages",
                                explanation: "Using the Percentages Card:\n\n" + (pct/100) + " \u00D7 " + base + " = " + ans + "\n\nSo " + pct + "% of " + base + " = " + ans
                            }
                        ]
                    };
                }
            },
            {
                id: "6th-exponents", name: "Exponents & Order of Operations", icon: "\u{1F4FF}",
                desc: "Powers and PEMDAS",
                cardId: "exponents", cardName: "Exponents Card",
                requiredCards: ["powers"],
                generate: function () {
                    var base = randInt(2, 5);
                    var exp = randInt(2, 3);
                    var result = Math.pow(base, exp);
                    return {
                        text: base + "^" + exp + " = ?", answer: result,
                        steps: [
                            {
                                requiredCard: "exponents",
                                explanation: "Using the Exponents Card:\n\n" + base + "^" + exp + " means multiplying " + base + " by itself " + exp + " times:\n\n" + Array.from({length: exp}, function() { return base; }).join(" \u00D7 ") + " = " + result
                            }
                        ]
                    };
                }
            },
            {
                id: "6th-negatives", name: "Negative Numbers", icon: "\u{2796}",
                desc: "Add, subtract, multiply negatives",
                cardId: "negatives", cardName: "Negatives Card",
                requiredCards: ["addition", "subtraction"],
                generate: function () {
                    var a = randInt(-10, -1);
                    var b = randInt(1, 10);
                    return {
                        text: a + " + " + b + " = ?", answer: a + b,
                        steps: [
                            {
                                requiredCard: "negatives",
                                explanation: "Using the Negatives Card:\n\n" + a + " + " + b + "\n\nThink of a number line:\nStart at " + a + ", move " + b + " steps right.\nLand on " + (a+b)
                            }
                        ]
                    };
                }
            },
            {
                id: "6th-expressions", name: "Variables & Expressions", icon: "\u{1F4D2}",
                desc: "Algebraic expressions",
                cardId: "variables", cardName: "Variables Card",
                requiredCards: ["multiplication", "addition"],
                generate: function () {
                    var x = randInt(2, 8);
                    var a = randInt(2, 6);
                    var b = randInt(1, 10);
                    var ans = a * x + b;
                    return {
                        text: "If x = " + x + ",\nwhat is " + a + "x + " + b + " = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "variables",
                                explanation: "Using the Variables Card:\n\nx = " + x + "\n\n" + a + "x means " + a + " \u00D7 x:\n" + a + " \u00D7 " + x + " = " + (a*x)
                            },
                            {
                                requiredCard: "addition",
                                explanation: "Using the Addition Card:\n\n" + (a*x) + " + " + b + " = " + ans + "\n\nSo " + a + "x + " + b + " = " + ans
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "7th-grade", name: "7th Grade", icon: "\u{1F4DA}",
        unlockCards: ["ratios", "percentages", "exponents", "negatives"],
        topics: [
            {
                id: "7th-proportional", name: "Proportional Relationships", icon: "\u{1F4C8}",
                desc: "Work with proportions",
                cardId: "proportions", cardName: "Proportions Card",
                requiredCards: ["ratios"],
                generate: function () {
                    var a = randInt(2, 5);
                    var b = randInt(2, 6);
                    var mult = randInt(2, 4);
                    return {
                        text: a + "/" + b + " = ?/" + (b * mult), answer: a * mult,
                        steps: [
                            {
                                requiredCard: "ratios",
                                explanation: "Using the Ratios Card:\n\nThe ratio " + a + ":" + b + "\nScale factor: " + (b*mult) + " \u00F7 " + b + " = " + mult
                            },
                            {
                                requiredCard: "proportions",
                                explanation: "Using the Proportions Card:\n\nMultiply both parts by " + mult + ":\n" + a + " \u00D7 " + mult + " = " + (a*mult) + "\n" + b + " \u00D7 " + mult + " = " + (b*mult) + "\n\nAnswer: " + (a*mult)
                            }
                        ]
                    };
                }
            },
            {
                id: "7th-integers", name: "Integers: Add & Subtract", icon: "\u{2795}\u{2796}",
                desc: "Operations with integers",
                cardId: "integers", cardName: "Integers Card",
                requiredCards: ["negatives"],
                generate: function () {
                    var a = randInt(-12, 12);
                    var b = randInt(-12, 12);
                    var ans = a - b;
                    return {
                        text: a + " - (" + b + ") = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "negatives",
                                explanation: "Using the Negatives Card:\n\n" + a + " - (" + b + ")\n\nSubtracting a negative = adding a positive:\n" + a + " + " + (-b) + " = " + ans
                            }
                        ]
                    };
                }
            },
            {
                id: "7th-rational", name: "Rational Numbers", icon: "\u{1F96A}",
                desc: "Operations with fractions and decimals",
                cardId: "rational", cardName: "Rational Numbers Card",
                requiredCards: ["add-decimals", "sub-decimals"],
                generate: function () {
                    var a = Math.round((randInt(1, 5) + randInt(1, 9) * 0.1) * 10) / 10;
                    var b = Math.round((randInt(1, 5) + randInt(1, 9) * 0.1) * 10) / 10;
                    var ans = Math.round((a + b) * 10) / 10;
                    return {
                        text: a + " + " + b + " = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "add-decimals",
                                explanation: "Using the Add Decimals Card:\n\nAlign decimals:\n  " + a + "\n+ " + b + "\n\nAdd: " + a + " + " + b + " = " + ans
                            }
                        ]
                    };
                }
            },
            {
                id: "7th-neg-mult-div", name: "Negatives: Multiply & Divide", icon: "\u{2716}\u{2796}",
                desc: "Multiply and divide negative numbers",
                cardId: "neg-mult-div", cardName: "Neg Mult/Div Card",
                requiredCards: ["negatives", "multiplication"],
                generate: function () {
                    var a = randInt(-8, -1);
                    var b = randInt(2, 8);
                    var ans = a * b;
                    return {
                        text: a + " \u00D7 " + b + " = ?", answer: ans,
                        steps: [
                            {
                                requiredCard: "negatives",
                                explanation: "Using the Negatives Card:\n\nRule: negative \u00D7 positive = negative\n\n|" + a + "| \u00D7 " + b + " = " + Math.abs(a) + " \u00D7 " + b + " = " + Math.abs(ans)
                            },
                            {
                                requiredCard: "neg-mult-div",
                                explanation: "Using the Neg Mult/Div Card:\n\nApply the negative sign:\n-(" + Math.abs(ans) + ") = " + ans
                            }
                        ]
                    };
                }
            },
            {
                id: "7th-equations", name: "Equations & Inequalities", icon: "\u{1F4D2}",
                desc: "Solve for x",
                cardId: "equations", cardName: "Equations Card",
                requiredCards: ["variables", "negatives"],
                generate: function () {
                    var x = randInt(-8, 8);
                    var a = randInt(2, 6);
                    var b = randInt(1, 15);
                    var result = a * x + b;
                    return {
                        text: a + "x + " + b + " = " + result + "\nx = ?", answer: x,
                        steps: [
                            {
                                requiredCard: "equations",
                                explanation: "Using the Equations Card:\n\nTo solve " + a + "x + " + b + " = " + result + ",\nwe need to isolate x."
                            },
                            {
                                requiredCard: "subtraction",
                                explanation: "Using the Subtraction Card:\n\nStep 1: Subtract " + b + " from both sides:\n" + a + "x + " + b + " - " + b + " = " + result + " - " + b + "\n" + a + "x = " + (result - b)
                            },
                            {
                                requiredCard: "division",
                                explanation: "Using the Division Card:\n\nStep 2: Divide both sides by " + a + ":\n" + a + "x \u00F7 " + a + " = " + (result - b) + " \u00F7 " + a + "\nx = " + x
                            }
                        ]
                    };
                }
            }
        ]
    },
    {
        id: "8th-grade", name: "8th Grade", icon: "\u{1F393}",
        unlockCards: ["proportions", "integers", "rational", "neg-mult-div", "equations"],
        topics: [
            {
                id: "8th-solve-unknown", name: "Solving Equations", icon: "\u{1F50D}",
                desc: "Multi-step equations",
                cardId: "solve-unknown", cardName: "Algebra Card",
                requiredCards: ["equations"],
                generate: function () {
                    var x = randInt(-6, 6);
                    var a = randInt(2, 5);
                    var b = randInt(1, 10);
                    var c = randInt(1, 8);
                    var result = a * x + b + c;
                    return {
                        text: a + "x + " + b + " + " + c + " = " + result + "\nx = ?", answer: x,
                        steps: [
                            {
                                requiredCard: "equations",
                                explanation: "Using the Equations Card:\n\n" + a + "x + " + b + " + " + c + " = " + result + "\n\nFirst simplify: " + a + "x + " + (b+c) + " = " + result
                            },
                            {
                                requiredCard: "subtraction",
                                explanation: "Using the Subtraction Card:\n\nSubtract " + (b+c) + " from both sides:\n" + a + "x = " + result + " - " + (b+c) + "\n" + a + "x = " + (result - b - c)
                            },
                            {
                                requiredCard: "solve-unknown",
                                explanation: "Using the Algebra Card:\n\nDivide by " + a + ":\nx = " + (result - b - c) + " \u00F7 " + a + "\nx = " + x
                            }
                        ]
                    };
                }
            },
            {
                id: "8th-linear", name: "Linear Equations", icon: "\u{1F4C8}",
                desc: "y = mx + b",
                cardId: "linear", cardName: "Linear Equations Card",
                requiredCards: ["solve-unknown", "proportions"],
                generate: function () {
                    var m = randInt(2, 5);
                    var b = randInt(1, 8);
                    var x = randInt(1, 5);
                    var y = m * x + b;
                    return {
                        text: "If y = " + m + "x + " + b + "\nand x = " + x + ", what is y?", answer: y,
                        steps: [
                            {
                                requiredCard: "linear",
                                explanation: "Using the Linear Equations Card:\n\ny = " + m + "x + " + b + "\n\nSubstitute x = " + x + ":"
                            },
                            {
                                requiredCard: "multiplication",
                                explanation: "Using the Multiplication Card:\n\ny = " + m + " \u00D7 " + x + " + " + b + "\ny = " + (m*x) + " + " + b + "\ny = " + y
                            }
                        ]
                    };
                }
            },
            {
                id: "8th-exponents-ops", name: "Exponents & Roots", icon: "\u{221A}",
                desc: "Advanced exponent operations",
                cardId: "exponents-ops", cardName: "Exponents Ops Card",
                requiredCards: ["exponents"],
                generate: function () {
                    var base = randInt(2, 6);
                    var exp = pick([2, 3]);
                    var result = Math.pow(base, exp);
                    var word = exp === 2 ? "square" : "cube";
                    return {
                        text: "What is the " + word + " root of " + result + "?", answer: base,
                        steps: [
                            {
                                requiredCard: "exponents",
                                explanation: "Using the Exponents Card:\n\nThe " + word + " root is the inverse of " + word + ".\n\n" + base + "^" + exp + " = " + result
                            },
                            {
                                requiredCard: "exponents-ops",
                                explanation: "Using the Exponents Ops Card:\n\n" + word.charAt(0).toUpperCase() + word.slice(1) + " root of " + result + " = ?\n\nWhat number " + (exp === 2 ? "squared" : "cubed") + " = " + result + "?\n\n" + base + (exp === 2 ? "\u00B2" : "\u00B3") + " = " + result + "\n\nAnswer: " + base
                            }
                        ]
                    };
                }
            }
        ]
    }
];

// ---------- GAME STATE ----------

var gameState = loadState();

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
        var s = localStorage.getItem("mathquest-state");
        return s ? JSON.parse(s) : defaultState();
    } catch (e) { return defaultState(); }
}

function saveState() {
    try { localStorage.setItem("mathquest-state", JSON.stringify(gameState)); } catch (e) {}
}

function hasCard(cardId) { return gameState.cards.indexOf(cardId) !== -1; }
function ownsAllCards(ids) { return ids.every(function(c) { return hasCard(c); }); }

function getLevel() {
    var l = 1;
    GRADES.forEach(function(g) { g.topics.forEach(function(t) {
        if (gameState.completedTopics.indexOf(t.id) !== -1) l++;
    }); });
    return l;
}

function getAllTopics() {
    var topics = [];
    GRADES.forEach(function(g) { g.topics.forEach(function(t) {
        topics.push({ id: t.id, name: t.name, gradeId: g.id });
    }); });
    return topics;
}

function findTopicByCard(cardId) {
    for (var i = 0; i < GRADES.length; i++) {
        for (var j = 0; j < GRADES[i].topics.length; j++) {
            if (GRADES[i].topics[j].cardId === cardId) {
                return { topic: GRADES[i].topics[j], grade: GRADES[i] };
            }
        }
    }
    return null;
}

// ---------- NAVIGATION ----------

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(function(s) { s.classList.remove("active"); });
    document.getElementById(id).classList.add("active");
    if (id === "screen-home") refreshHome();
    if (id === "screen-play") renderGrades();
    if (id === "screen-cards") renderCards();
    if (id === "screen-progress") renderProgress();
}

function refreshHome() {
    document.getElementById("home-stars").textContent = gameState.stars;
    document.getElementById("home-cards").textContent = gameState.cards.length;
    document.getElementById("home-level").textContent = getLevel();
}

// ---------- GRADE SELECT ----------

function renderGrades() {
    var c = document.getElementById("grade-list");
    c.innerHTML = "";
    GRADES.forEach(function(grade) {
        var unlocked = ownsAllCards(grade.unlockCards);
        var done = grade.topics.filter(function(t) { return gameState.completedTopics.indexOf(t.id) !== -1; }).length;
        var complete = done === grade.topics.length;
        var card = document.createElement("div");
        card.className = "grade-card" + (!unlocked ? " locked" : "") + (complete ? " completed" : "");
        card.innerHTML =
            '<div class="grade-card-icon">' + grade.icon + '</div>' +
            '<div class="grade-card-name">' + grade.name + '</div>' +
            '<div class="grade-card-progress">' + done + '/' + grade.topics.length + ' topics</div>' +
            (!unlocked ? '<div class="lock-icon">\u{1F512}</div>' : '') +
            (complete ? '<div class="check-icon">\u{2705}</div>' : '');
        if (unlocked) card.onclick = function() { openGrade(grade); };
        c.appendChild(card);
    });
}

function openGrade(grade) {
    document.getElementById("topics-grade-title").textContent = grade.name;
    var c = document.getElementById("topic-list");
    c.innerHTML = "";
    grade.topics.forEach(function(topic) {
        var done = gameState.completedTopics.indexOf(topic.id) !== -1;
        var cardsOk = ownsAllCards(topic.requiredCards);
        var locked = !cardsOk && !done;
        var item = document.createElement("div");
        item.className = "topic-item" + (locked ? " locked" : "") + (done ? " completed" : "");
        var badgeClass = done ? "done" : locked ? "locked-badge" : "new";
        var badgeText = done ? "\u{2705} Done" : locked ? "\u{1F512} Locked" : "Play";
        item.innerHTML =
            '<div class="topic-icon">' + topic.icon + '</div>' +
            '<div class="topic-info"><div class="topic-name">' + topic.name + '</div>' +
            '<div class="topic-desc">' + topic.desc + '</div></div>' +
            '<div class="topic-badge ' + badgeClass + '">' + badgeText + '</div>';
        if (!locked) item.onclick = function() { startTopic(topic); };
        c.appendChild(item);
    });
    showScreen("screen-topics");
}

// ---------- GAME ----------

var currentTopic = null;
var currentProblem = null;
var currentStepIndex = 0;
var problemsCorrect = 0;
var problemsAttempted = 0;
var problemsNeeded = 5;
var topicStarsEarned = 0;

function startTopic(topic) {
    currentTopic = topic;
    problemsCorrect = 0;
    problemsAttempted = 0;
    topicStarsEarned = 0;
    problemsNeeded = 5;
    document.getElementById("game-topic-name").textContent = topic.name;
    document.getElementById("game-stars").textContent = gameState.stars;
    updateGameProgress();
    nextProblem();
    showScreen("screen-game");
}

function nextProblem() {
    if (problemsCorrect >= problemsNeeded) {
        completeTopic();
        return;
    }
    currentProblem = currentTopic.generate();
    currentStepIndex = 0;

    document.getElementById("problem-text").textContent = currentProblem.text;
    document.getElementById("problem-label").textContent = "Solve this:";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "feedback";

    // Reset UI
    document.getElementById("explanation-box").style.display = "none";
    document.getElementById("answer-section").style.display = "none";
    document.getElementById("next-step-section").style.display = "none";
    document.getElementById("step-indicator").style.display = "none";
    document.getElementById("pick-prompt").style.display = "block";
    document.getElementById("answer-input").value = "";

    updateGameProgress();
}

function updateGameProgress() {
    var pct = Math.min(100, (problemsCorrect / problemsNeeded) * 100);
    document.getElementById("game-progress-fill").style.width = pct + "%";
    document.getElementById("game-progress-text").textContent = problemsCorrect + "/" + problemsNeeded;
}

// ---------- CARD PICKER ----------

function openCardPicker() {
    if (!currentProblem || !currentProblem.steps[currentStepIndex]) return;

    var overlay = document.getElementById("card-picker-overlay");
    var grid = document.getElementById("picker-cards-grid");
    var feedback = document.getElementById("picker-feedback");
    feedback.textContent = "";
    feedback.className = "picker-feedback";
    grid.innerHTML = "";

    var step = currentProblem.steps[currentStepIndex];
    var hint = document.getElementById("picker-hint");
    hint.textContent = "Step " + (currentStepIndex + 1) + " of " + currentProblem.steps.length + " \u2014 Pick the right card!";

    // Show all owned cards
    gameState.cards.forEach(function(cardId) {
        var info = getCardInfo(cardId);
        var el = document.createElement("div");
        el.className = "picker-card";
        el.innerHTML =
            '<div class="picker-card-icon">' + info.icon + '</div>' +
            '<div class="picker-card-name">' + info.name + '</div>';
        el.onclick = function() { pickCard(cardId, el); };
        grid.appendChild(el);
    });

    overlay.style.display = "flex";
}

function closeCardPicker() {
    document.getElementById("card-picker-overlay").style.display = "none";
}

function pickCard(cardId, el) {
    var step = currentProblem.steps[currentStepIndex];
    var feedback = document.getElementById("picker-feedback");

    if (cardId === step.requiredCard) {
        // Correct card!
        el.className = "picker-card correct";
        feedback.textContent = "\u{2705} Correct card!";
        feedback.className = "picker-feedback correct";

        setTimeout(function() {
            closeCardPicker();
            showExplanation(step);
        }, 600);
    } else {
        // Wrong card
        el.className = "picker-card wrong";
        feedback.textContent = "\u{274C} Not the right card for this step. Try again!";
        feedback.className = "picker-feedback wrong";

        setTimeout(function() {
            el.className = "picker-card";
        }, 600);
    }
}

function showExplanation(step) {
    var box = document.getElementById("explanation-box");
    var cardInfo = getCardInfo(step.requiredCard);

    document.getElementById("explanation-card-icon").textContent = cardInfo.icon;
    document.getElementById("explanation-card-name").textContent = cardInfo.name;
    document.getElementById("explanation-body").textContent = step.explanation;

    box.style.display = "block";

    // Step indicator
    if (currentProblem.steps.length > 1) {
        document.getElementById("step-indicator").style.display = "block";
        document.getElementById("step-text").textContent = "Step " + (currentStepIndex + 1) + " of " + currentProblem.steps.length;
    }

    // Check if more steps or show answer
    if (currentStepIndex < currentProblem.steps.length - 1) {
        // More steps
        document.getElementById("next-step-section").style.display = "block";
        document.getElementById("pick-prompt").style.display = "none";
    } else {
        // Last step - show answer input
        document.getElementById("pick-prompt").style.display = "none";
        document.getElementById("answer-section").style.display = "flex";

        if (currentProblem.type === "fraction") {
            document.getElementById("answer-input").placeholder = "a/b";
            document.getElementById("answer-input").inputMode = "text";
        } else {
            document.getElementById("answer-input").placeholder = "Type your final answer...";
            document.getElementById("answer-input").inputMode = "decimal";
        }

        setTimeout(function() {
            document.getElementById("answer-input").focus();
        }, 300);
    }
}

function nextStep() {
    currentStepIndex++;
    document.getElementById("explanation-box").style.display = "none";
    document.getElementById("next-step-section").style.display = "none";
    document.getElementById("step-indicator").style.display = "none";

    if (currentStepIndex >= currentProblem.steps.length) {
        // All steps done, show answer
        document.getElementById("pick-prompt").style.display = "none";
        document.getElementById("answer-section").style.display = "flex";
        setTimeout(function() { document.getElementById("answer-input").focus(); }, 300);
    } else {
        // More steps - show card picker
        document.getElementById("pick-prompt").style.display = "block";
    }
}

// ---------- ANSWER SUBMISSION ----------

function submitAnswer() {
    var input = document.getElementById("answer-input");
    var raw = input.value.trim();
    if (!raw) return;

    problemsAttempted++;
    var correct = false;

    if (currentProblem.type === "fraction") {
        var parts = raw.split("/");
        if (parts.length === 2) {
            var num = parseInt(parts[0]);
            var den = parseInt(parts[1]);
            var expectedParts = String(currentProblem.answer).split("/");
            var expNum = parseInt(expectedParts[0]);
            var expDen = parseInt(expectedParts[1]);
            if (!isNaN(num) && !isNaN(den) && den !== 0) {
                var g1 = gcd(Math.abs(num), Math.abs(den));
                var g2 = gcd(Math.abs(expNum), Math.abs(expDen));
                correct = (num/g1 === expNum/g2 && den/g1 === expDen/g2);
            }
        }
    } else {
        var userAnswer = parseFloat(raw);
        correct = !isNaN(userAnswer) && Math.abs(userAnswer - currentProblem.answer) < 0.01;
    }

    var feedback = document.getElementById("feedback");
    var problemCard = document.getElementById("problem-card");

    if (correct) {
        problemsCorrect++;
        topicStarsEarned = problemsCorrect >= problemsNeeded ? 3 : problemsCorrect >= problemsNeeded - 1 ? 2 : problemsCorrect >= 3 ? 1 : 0;
        feedback.textContent = "\u{2705} Correct! Great job!";
        feedback.className = "feedback correct";
        problemCard.style.animation = "correctFlash 0.5s ease";
        gameState.totalCorrect++;
        updateGameProgress();
    } else {
        feedback.textContent = "\u{274C} Wrong! The answer is: " + currentProblem.answer;
        feedback.className = "feedback wrong";
        problemCard.style.animation = "shake 0.4s ease";
    }

    gameState.totalAttempts++;
    gameState.stars += correct ? 1 : 0;
    document.getElementById("game-stars").textContent = gameState.stars;
    saveState();

    setTimeout(function() {
        problemCard.style.animation = "";
        nextProblem();
    }, correct ? 800 : 2000);
}

function exitGame() { showScreen("screen-topics"); }

// ---------- TOPIC COMPLETE ----------

function completeTopic() {
    var isNew = gameState.completedTopics.indexOf(currentTopic.id) === -1;
    if (isNew) gameState.completedTopics.push(currentTopic.id);
    gameState.topicStars[currentTopic.id] = Math.max(gameState.topicStars[currentTopic.id] || 0, topicStarsEarned);
    if (isNew && !hasCard(currentTopic.cardId)) gameState.cards.push(currentTopic.cardId);
    saveState();

    document.getElementById("complete-topic-name").textContent = currentTopic.name;
    document.getElementById("complete-correct").textContent = problemsCorrect;
    document.getElementById("complete-stars-earned").textContent = topicStarsEarned;
    var acc = problemsAttempted > 0 ? Math.round((problemsCorrect / problemsAttempted) * 100) : 0;
    document.getElementById("complete-accuracy").textContent = acc + "%";
    document.getElementById("reward-card-icon").textContent = currentTopic.cardIcon || "\u{1F3C6}";
    document.getElementById("reward-card-name").textContent = currentTopic.cardName;

    var stars = [document.getElementById("complete-star1"), document.getElementById("complete-star2"), document.getElementById("complete-star3")];
    stars.forEach(function(s) { s.className = "big-star"; });

    showScreen("screen-complete");

    stars.forEach(function(s, i) {
        if (i < topicStarsEarned) {
            setTimeout(function() { s.classList.add("earned"); }, 300 + i * 400);
        }
    });
}

// ---------- MY CARDS ----------

function renderCards() {
    var c = document.getElementById("cards-grid");
    c.innerHTML = "";
    GRADES.forEach(function(grade) {
        grade.topics.forEach(function(topic) {
            var owned = hasCard(topic.cardId);
            var item = document.createElement("div");
            item.className = "card-item" + (owned ? " owned" : " locked-card");
            item.innerHTML =
                '<div class="card-item-icon">' + topic.cardIcon + '</div>' +
                '<div class="card-item-name">' + topic.cardName + '</div>' +
                '<div class="card-item-topic">' + (owned ? grade.name : "\u{1F512} Locked") + '</div>';
            c.appendChild(item);
        });
    });
}

// ---------- PROGRESS ----------

function renderProgress() {
    var total = getAllTopics().length;
    var done = gameState.completedTopics.length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    var acc = gameState.totalAttempts > 0 ? Math.round((gameState.totalCorrect / gameState.totalAttempts) * 100) : 0;

    document.querySelector("#ring-topics .ring-value").textContent = pct + "%";
    document.querySelector("#ring-problems .ring-value").textContent = gameState.totalCorrect;
    document.querySelector("#ring-accuracy .ring-value").textContent = acc + "%";

    var c = document.getElementById("progress-grades");
    c.innerHTML = "";
    GRADES.forEach(function(grade) {
        var doneCount = grade.topics.filter(function(t) { return gameState.completedTopics.indexOf(t.id) !== -1; }).length;
        var p = grade.topics.length > 0 ? Math.round((doneCount / grade.topics.length) * 100) : 0;
        var item = document.createElement("div");
        item.className = "progress-grade-item";
        item.innerHTML =
            '<div class="progress-grade-header"><span class="progress-grade-name">' + grade.icon + ' ' + grade.name + '</span>' +
            '<span class="progress-grade-pct">' + doneCount + '/' + grade.topics.length + '</span></div>' +
            '<div class="progress-bar"><div class="progress-bar-fill" style="width:' + p + '%"></div></div>';
        c.appendChild(item);
    });
}

// ---------- KEYBOARD ----------

document.getElementById("answer-input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") submitAnswer();
});

// ---------- INIT ----------

refreshHome();
