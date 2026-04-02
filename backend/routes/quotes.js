const express = require('express');
const router = express.Router();

const staticQuotes = {
  happy: [
    { _id: '1', content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { _id: '2', content: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
    { _id: '3', content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { _id: '4', content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { _id: '5', content: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },
    { _id: '6', content: "Let us be grateful to the people who make us happy.", author: "Marcel Proust" }
  ],
  calm: [
    { _id: '25', content: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { _id: '26', content: "The nearer a man comes to a calm mind, the closer he is to strength.", author: "Marcus Aurelius" },
    { _id: '27', content: "Calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
    { _id: '28', content: "Silence is a source of great strength.", author: "Lao Tzu" },
    { _id: '29', content: "Serenity is not freedom from the storm, but peace amid the storm.", author: "Unknown" },
    { _id: '30', content: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" }
  ],
  neutral: [
    { _id: '49', content: "Life is ten percent what happens to you and ninety percent how you respond to it.", author: "Charles R. Swindoll" },
    { _id: '50', content: "Staying neutral doesn't mean you don't care—it means you're letting balance lead.", author: "Unknown" },
    { _id: '51', content: "Stillness speaks louder than noise.", author: "Eckhart Tolle" },
    { _id: '52', content: "There is a calmness to a life lived in gratitude.", author: "Ralph H. Blum" },
    { _id: '53', content: "Sometimes doing nothing is the best response.", author: "Unknown" },
    { _id: '54', content: "Equanimity is the hallmark of spiritual maturity.", author: "Eknath Easwaran" }
  ],
  worried: [
    { _id: '31', content: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { _id: '32', content: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
    { _id: '33', content: "Worrying doesn't take away tomorrow's troubles, it takes away today's peace.", author: "Randy Armstrong" },
    { _id: '34', content: "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.", author: "Charles Spurgeon" },
    { _id: '35', content: "You are stronger than you think.", author: "Unknown" },
    { _id: '36', content: "Smile, breathe, and go slowly.", author: "Thich Nhat Hanh" }
  ],
  sad: [
    { _id: '7', content: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
    { _id: '8', content: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine" },
    { _id: '9', content: "Every human walks around with a certain kind of sadness.", author: "Unknown" },
    { _id: '10', content: "You cannot protect yourself from sadness without protecting yourself from happiness.", author: "Jonathan Safran Foer" },
    { _id: '11', content: "Crying is all right in its way while it lasts.", author: "C.S. Lewis" },
    { _id: '12', content: "The good times of today are the sad thoughts of tomorrow.", author: "Bob Marley" }
  ],
  frustrated: [
    { _id: '55', content: "Frustration, although quite painful at times, is a very positive and essential part of success.", author: "Bo Bennett" },
    { _id: '56', content: "Sometimes things have to go wrong before they can go right.", author: "Sherrilyn Kenyon" },
    { _id: '57', content: "Out of difficulties grow miracles.", author: "Jean de La Bruyère" },
    { _id: '58', content: "Frustration is a sign that you're trying to make things better.", author: "Unknown" },
    { _id: '59', content: "Patience is the antidote to frustration.", author: "Unknown" },
    { _id: '60', content: "It's okay to be frustrated. It's not okay to give up.", author: "Unknown" }
  ],
  angry: [
    { _id: '13', content: "Speak when you are angry and you will make the best speech you will ever regret.", author: "Ambrose Bierce" },
    { _id: '14', content: "Anger is a short madness.", author: "Horace" },
    { _id: '15', content: "Never go to bed mad. Stay up and fight.", author: "Phyllis Diller" },
    { _id: '16', content: "Anger is an acid that can do more harm to the vessel in which it is stored.", author: "Mark Twain" },
    { _id: '17', content: "Holding on to anger is like drinking poison and expecting the other person to die.", author: "Buddha" },
    { _id: '18', content: "For every minute you remain angry, you give up sixty seconds of peace of mind.", author: "Ralph Waldo Emerson" }
  ],
  loved: [
    { _id: '61', content: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
    { _id: '62', content: "Where there is love there is life.", author: "Mahatma Gandhi" },
    { _id: '63', content: "Love cures people—both the ones who give it and the ones who receive it.", author: "Karl A. Menninger" },
    { _id: '64', content: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
    { _id: '65', content: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { _id: '66', content: "You are loved more than you will ever know.", author: "Unknown" }
  ]
};

router.get('/', (req, res) => {
  const { mood } = req.query;
  if (!mood) return res.status(400).json({ message: 'Mood is required' });

  const quotes = staticQuotes[mood.toLowerCase()] || [];
  res.json(quotes);
});

module.exports = router;