const leaderboard = (() => {
  const GAME_ID = 'TNtgfC4RmsugffjoHvi8';
  const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  const saveUser = (user, score) => fetch(`${BASE_URL}games/${GAME_ID}/scores/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, score }),
  }).then(response => response.json());

  const getScores = () => fetch(`${BASE_URL}games/${GAME_ID}/scores/`, { mode: 'cors' })
    .then(response => response.json())
    .then(data => data.result);

  const offerScore = (user, score) => {
    getScores().then(arr => {
      const userScores = arr.filter(obj => obj.user === user);
      if (userScores) {
        let userMax = 0;
        userScores.forEach(obj => {
          if (obj.score > 0) userMax = obj.score;
        });

        if (score > userMax) saveUser(user, score);
      } else {
        saveUser(user, score);
      }
    });
  };

  return { offerScore, getScores };
})();

export default leaderboard;