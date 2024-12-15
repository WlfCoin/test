function openTab(event, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-link');
  
    tabContents.forEach(content => content.classList.remove('active'));
    tabLinks.forEach(link => link.classList.remove('active'));
  
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
  }
  
  function navigate(page) {
    window.location.href = page;
  }
  
  function startTask(taskId) {
    alert(`Task ${taskId} started. Please complete it to earn rewards.`);
    // Send task progress to server via API call (optional)
  }
  