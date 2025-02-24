import Progress from '@/components/Progress/Progress.js';

document.addEventListener('DOMContentLoaded', () => {
  const progressContainer = document.getElementById('root');

  new Progress(progressContainer, 33);
});
