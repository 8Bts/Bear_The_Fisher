import Leaderboard from '../leaderboard';

const module = (() => {
  const renderTable = (_this) => {
    const { width, height } = _this.cameras.main;
    const scoresCont = _this.add.dom(width / 2, (height / 2) + 60).createFromCache('scoresCont');
    const tableDOM = scoresCont.getChildByID('scoresTable');

    scoresCont.addListener('click');
    scoresCont.on('click', (event) => {
      if (event.target.name === 'back-button') scoresCont.removeElement();
    });


    Leaderboard.getScores().then(result => {
      result.sort((a, b) => b.score - a.score).forEach((data, idx) => {
        if (idx > 9) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="text-center">${idx + 1}</td>
          <td>${data.user}</td>
          <td class="text-center">${data.score}</td>
          `;
        tableDOM.appendChild(tr);
      });
    });
  };

  return { renderTable };
})();

export default module;