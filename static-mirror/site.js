(() => {
  const dataNode = document.getElementById('mirror-data');
  if (!dataNode) return;
  const payload = JSON.parse(dataNode.textContent || '{}');
  const form = document.querySelector('[data-filters]');
  const basePath = document.body.dataset.basePath || '';

  const normalize = (value) =>
    String(value || '')
      .trim()
      .toLocaleLowerCase('zh-CN');
  const params = new URLSearchParams(location.search);
  const fields = ['q', 'topic', 'ai', 'priority'];
  if (form) {
    fields.forEach((name) => {
      const field = form.elements.namedItem(name);
      const value = params.get(name);
      if (field && value) field.value = value;
    });
    const applyFilters = () => {
      const values = Object.fromEntries(new FormData(form));
      let visible = 0;
      document.querySelectorAll('[data-paper]').forEach((paper) => {
        const matches =
          (!values.q ||
            normalize(paper.dataset.search).includes(normalize(values.q))) &&
          (values.topic === 'all' || paper.dataset.topic === values.topic) &&
          (values.ai === 'all' || paper.dataset.ai === values.ai) &&
          (values.priority === 'all' ||
            paper.dataset.priority === values.priority);
        paper.hidden = !matches;
        if (matches) visible += 1;
      });
      document.querySelectorAll('[data-group]').forEach((group) => {
        const count = group.querySelectorAll(
          '[data-paper]:not([hidden])',
        ).length;
        group.hidden = count === 0;
        const countNode = group.querySelector('[data-group-count]');
        if (countNode) countNode.textContent = String(count);
      });
      document.querySelectorAll('[data-ai-group]').forEach((group) => {
        group.hidden =
          group.querySelectorAll('[data-group]:not([hidden])').length === 0;
      });
      const empty = document.querySelector('[data-empty]');
      if (empty) empty.hidden = visible !== 0;
      const next = new URLSearchParams();
      fields.forEach((name) => {
        const value = values[name];
        if (value && value !== 'all') next.set(name, value);
      });
      history.replaceState(
        null,
        '',
        `${location.pathname}${next.size ? `?${next}` : ''}`,
      );
    };
    form.addEventListener('input', applyFilters);
    form.addEventListener('change', (event) => {
      if (event.target.matches('[data-date]')) {
        location.href = `${basePath}/daily/${event.target.value}/`;
        return;
      }
      applyFilters();
    });
    applyFilters();
  }

  const chart = document.querySelector('[data-chart]');
  const toggle = document.querySelector('[data-trend-toggle]');
  let expanded = false;
  const renderChart = () => {
    if (!chart || !payload.volume) return;
    const weeks = expanded ? payload.volume.weeks104 : payload.volume.weeks26;
    if (!weeks.length) {
      chart.textContent = '暂无完整周数据。';
      return;
    }
    const width = 900;
    const height = 330;
    const padding = { top: 18, right: 16, bottom: 42, left: 42 };
    const max = Math.max(
      1,
      ...weeks.flatMap((week) => [week.mathDg, week.mathMg, week.mathGt]),
    );
    const x = (index) =>
      padding.left +
      (index / Math.max(1, weeks.length - 1)) *
        (width - padding.left - padding.right);
    const y = (value) =>
      height -
      padding.bottom -
      (value / max) * (height - padding.top - padding.bottom);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute(
      'aria-label',
      `最近 ${weeks.length} 个完整周的分类发文趋势`,
    );
    [0, 0.25, 0.5, 0.75, 1].forEach((ratio) => {
      const line = document.createElementNS(svg.namespaceURI, 'line');
      const lineY = y(max * ratio);
      line.setAttribute('x1', String(padding.left));
      line.setAttribute('x2', String(width - padding.right));
      line.setAttribute('y1', String(lineY));
      line.setAttribute('y2', String(lineY));
      line.setAttribute('class', 'grid');
      svg.append(line);
      const label = document.createElementNS(svg.namespaceURI, 'text');
      label.setAttribute('x', String(padding.left - 8));
      label.setAttribute('y', String(lineY + 4));
      label.setAttribute('text-anchor', 'end');
      label.textContent = String(Math.round(max * ratio));
      svg.append(label);
    });
    const draw = (key, className) => {
      const path = document.createElementNS(svg.namespaceURI, 'path');
      path.setAttribute(
        'd',
        weeks
          .map(
            (week, index) =>
              `${index ? 'L' : 'M'}${x(index).toFixed(2)},${y(week[key]).toFixed(2)}`,
          )
          .join(' '),
      );
      path.setAttribute('class', className);
      svg.append(path);
    };
    draw('mathDg', 'dg');
    draw('mathMg', 'mg');
    draw('mathGt', 'gt');
    const tickEvery = Math.max(1, Math.ceil(weeks.length / 7));
    weeks.forEach((week, index) => {
      if (index % tickEvery && index !== weeks.length - 1) return;
      const label = document.createElementNS(svg.namespaceURI, 'text');
      label.setAttribute('x', String(x(index)));
      label.setAttribute('y', String(height - 14));
      label.setAttribute('text-anchor', 'middle');
      label.textContent = week.weekEnding.slice(5);
      svg.append(label);
    });
    chart.replaceChildren(svg);
  };
  if (toggle) {
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      toggle.textContent = expanded ? '收回至 6 个月' : '展开至 2 年';
      renderChart();
    });
  }
  renderChart();
})();
