import 'regenerator-runtime/runtime';

const leaderboard = (() => {
  const GAME_ID = 'TNtgfC4RmsugffjoHvi8';
  const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  const saveUser = async (user, score) => {
    const response = await fetch(`${BASE_URL}games/${GAME_ID}/scores/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });

    return response.json();
  };

  const getScores = async () => {
    const response = await fetch(`${BASE_URL}games/${GAME_ID}/scores/`, { mode: 'cors' });
    const data = await response.json();
    return data.result;
  };


  const offerScore = async (user, score) => {
    const arr = await getScores();
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
  };

  return { offerScore, getScores };
})();

export default leaderboard;