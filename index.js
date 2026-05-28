/* ==========================================================================
   Antigravity 一站式介紹網頁 - 核心 JavaScript 邏輯
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. 亮暗主題切換
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
        }
    });


    // ==========================================================================
    // 2. 導覽列滾動響應與 active 錨點更新
    // ==========================================================================
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // 頂部模糊背景加深
        if (window.scrollY > 20) {
            header.style.backgroundColor = 'var(--glass-bg)';
            header.style.boxShadow = 'var(--nav-shadow)';
        } else {
            header.style.backgroundColor = 'var(--glass-bg)';
        }

        // 依滾動距離更新 Active Nav Link
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================================================
    // 3. Tabs 切換功能 (三大介面與 Prompt 範本)
    // ==========================================================================
    
    // 三大介面 Tabs
    const surfaceButtons = document.querySelectorAll('.surface-btn');
    const surfacePanels = document.querySelectorAll('.surface-panel');

    surfaceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            surfaceButtons.forEach(b => b.classList.remove('active'));
            surfacePanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Prompt 範本 Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });


    // ==========================================================================
    // 4. 一鍵複製 Prompt 範本
    // ==========================================================================
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const codeEl = document.getElementById(targetId);
            
            if (codeEl) {
                const textToCopy = codeEl.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> 已複製';
                    btn.classList.add('copied');
                    
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('複製失敗:', err);
                });
            }
        });
    });


    // ==========================================================================
    // 5. 智慧 Agent 互動模擬器狀態機
    // ==========================================================================
    
    // 模擬情境數據定義
    const SCENARIOS = {
        attendance: {
            goalText: '請建立一個繁體中文的班級出缺席登記網頁，需具備新增學生、勾選出勤狀態（出席、遲到、缺席）以及統計圖表功能。介面使用深色高質感玻璃擬態設計。',
            planMD: `
# [NEW] 班級出缺席登記網頁實作計畫

本計畫旨在為高三乙班建立一個網頁版的出缺席登記教具。支援動態新增名單、即時統計與視覺化回報。

## 擬修改與新建的檔案
*   **[NEW] [index.html](file:///c:/AIagent_Antigravity/attendance/index.html)**: 建立玻璃擬態的 APP 容器、學生名單 DOM 及統計表格。
*   **[NEW] [style.css](file:///c:/AIagent_Antigravity/attendance/style.css)**: HSL 暗色調樣式，搭配 backdrop-filter 毛玻璃特效。
*   **[NEW] [app.js](file:///c:/AIagent_Antigravity/attendance/app.js)**: 提供出勤狀態切換、本地存儲、以及數據加載邏輯。

## 驗證計畫
1.  **自動化測試**:
    - 啟動 localhost 伺服器並載入頁面。
    - 模擬滑鼠點擊出勤按鈕，檢查狀態值是否即時變更。
2.  **視覺與響應式**:
    - 確保在手機尺寸 (375x812) 下，名單表格可自動滾動，按鈕不易誤觸。
            `,
            diffCode: `
<span class="c-num">1</span> <span class="c-tag">&lt;div</span> <span class="c-attr">class</span>=<span class="c-str">"mock-app-attendance"</span><span class="c-tag">&gt;</span>
<span class="c-num">2</span>     <span class="c-tag">&lt;h4&gt;</span>高三乙班出缺席登記表<span class="c-tag">&lt;/h4&gt;</span>
<span class="c-num">3</span>     <span class="c-tag">&lt;div</span> <span class="c-attr">class</span>=<span class="c-str">"student-list"</span><span class="c-tag">&gt;</span>
<span class="c-num">4</span> <span class="add-line">+       &lt;div class="student-row"&gt;</span>
<span class="c-num">5</span> <span class="add-line">+           &lt;span&gt;張小明&lt;/span&gt;</span>
<span class="c-num">6</span> <span class="add-line">+           &lt;div class="attendance-opts"&gt;</span>
<span class="c-num">7</span> <span class="add-line">+               &lt;button class="attendance-btn-mini active"&gt;出席&lt;/button&gt;</span>
<span class="c-num">8</span> <span class="add-line">+               &lt;button class="attendance-btn-mini"&gt;遲到&lt;/button&gt;</span>
<span class="c-num">9</span> <span class="add-line">+               &lt;button class="attendance-btn-mini"&gt;缺席&lt;/button&gt;</span>
<span class="c-num">10</span> <span class="add-line">+           &lt;/div&gt;</span>
<span class="c-num">11</span> <span class="add-line">+       &lt;/div&gt;</span>
<span class="c-num">12</span> <span class="add-line">+       &lt;div class="student-row"&gt;</span>
<span class="c-num">13</span> <span class="add-line">+           &lt;span&gt;李小華&lt;/span&gt;</span>
<span class="c-num">14</span> <span class="add-line">+           &lt;div class="attendance-opts"&gt;</span>
<span class="c-num">15</span> <span class="add-line">+               &lt;button class="attendance-btn-mini"&gt;出席&lt;/button&gt;</span>
<span class="c-num">16</span> <span class="add-line">+               &lt;button class="attendance-btn-mini active"&gt;遲到&lt;/button&gt;</span>
<span class="c-num">17</span> <span class="add-line">+               &lt;button class="attendance-btn-mini"&gt;缺席&lt;/button&gt;</span>
<span class="c-num">18</span> <span class="add-line">+           &lt;/div&gt;</span>
<span class="c-num">19</span> <span class="add-line">+       &lt;/div&gt;</span>
<span class="c-num">20</span>     <span class="c-tag">&lt;/div&gt;</span>
<span class="c-num">21</span> <span class="c-tag">&lt;/div&gt;</span>
            `,
            browserURL: 'http://localhost:3000/attendance.html',
            browserViewportHTML: `
<div class="mock-app-attendance">
    <h4>高三乙班 出缺席登記表 (本地模擬)</h4>
    <div class="student-list">
        <div class="student-row">
            <span>張小明</span>
            <div class="attendance-opts">
                <button class="attendance-btn-mini active" onclick="toggleSimAttendance(this)">出席</button>
                <button class="attendance-btn-mini" onclick="toggleSimAttendance(this)">遲到</button>
                <button class="attendance-btn-mini" onclick="toggleSimAttendance(this)">缺席</button>
            </div>
        </div>
        <div class="student-row">
            <span>李小華</span>
            <div class="attendance-opts">
                <button class="attendance-btn-mini" onclick="toggleSimAttendance(this)">出席</button>
                <button class="attendance-btn-mini active" onclick="toggleSimAttendance(this)">遲到</button>
                <button class="attendance-btn-mini" onclick="toggleSimAttendance(this)">缺席</button>
            </div>
        </div>
        <div class="student-row">
            <span>王大同</span>
            <div class="attendance-opts">
                <button class="attendance-btn-mini" onclick="toggleSimAttendance(this)">出席</button>
                <button class="attendance-btn-mini" onclick="toggleSimAttendance(this)">遲到</button>
                <button class="attendance-btn-mini active" onclick="toggleSimAttendance(this)">缺席</button>
            </div>
        </div>
    </div>
    <div style="font-size: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.5rem; text-align: center; color: var(--text-secondary);">
        提示：您可以點選按鈕，測試虛擬網頁互動！
    </div>
</div>
            `
        },
        calculator: {
            goalText: '請分析並重構目前專案中的購物車金額計算邏輯 (cart.js)。學生原始的寫法使用了重複的 nested if-else。請改用更具函數式風格的陣列 reduce 方法重構，並在所有函式加上繁體中文 JSDoc 註解。',
            planMD: `
# [MODIFY] 購物車代碼重構計畫

本計畫旨在分析專案中的購物車計算邏輯，並以乾淨、可讀性高的函數式 JavaScript 重構。

## 擬修改檔案
*   **[MODIFY] [cart.js](file:///c:/AIagent_Antigravity/src/cart.js)**: 
    - 移除 nested for-loop 與 if-else 區塊。
    - 導入 ES6 Array.prototype.reduce 寫法。
    - 加入規範的 JSDoc 繁體中文註解。

## 驗證計畫
1.  **單元測試**:
    - 撰寫本機測試腳本 <code>test_cart.js</code>。
    - 模擬一般商品、書籍折價商品及邊界極限值（如空購物車），比對重構前與重構後的金額是否 100% 一致。
            `,
            diffCode: `
<span class="c-num">1</span> <span class="c-muted">/**</span>
<span class="c-num">2</span> <span class="add-line">+ * 計算購物車總金額並套用特定商品折扣</span>
<span class="c-num">3</span> <span class="add-line">+ * @param {Array&lt;{price: number, type: string}&gt;} cart - 購物車商品列表</span>
<span class="c-num">4</span> <span class="add-line">+ * @returns {number} 折扣後的總金額</span>
<span class="c-num">5</span> <span class="add-line">+ */</span>
<span class="c-num">6</span> <span class="del-line">- function calculateTotal(cart) {</span>
<span class="c-num">7</span> <span class="del-line">-     var total = 0;</span>
<span class="c-num">8</span> <span class="del-line">-     for (var i = 0; i &lt; cart.length; i++) {</span>
<span class="c-num">9</span> <span class="del-line">-         if (cart[i].type === 'book') {</span>
<span class="c-num">10</span> <span class="del-line">-             total += cart[i].price * 0.9;</span>
<span class="c-num">11</span> <span class="del-line">-         } else {</span>
<span class="c-num">12</span> <span class="del-line">-             total += cart[i].price;</span>
<span class="c-num">13</span> <span class="del-line">-         }</span>
<span class="c-num">14</span> <span class="del-line">-     }</span>
<span class="c-num">15</span> <span class="del-line">-     return total;</span>
<span class="c-num">16</span> <span class="del-line">- }</span>
<span class="c-num">17</span> <span class="add-line">+ const calculateTotal = (cart) => {</span>
<span class="c-num">18</span> <span class="add-line">+     return cart.reduce((total, item) => {</span>
<span class="c-num">19</span> <span class="add-line">+         const discount = item.type === 'book' ? 0.9 : 1.0;</span>
<span class="c-num">20</span> <span class="add-line">+         return total + (item.price * discount);</span>
<span class="c-num">21</span> <span class="add-line">+     }, 0);</span>
<span class="c-num">22</span> <span class="add-line">+ };</span>
            `,
            browserURL: 'terminal://localhost/run-tests',
            browserViewportHTML: `
<div class="mock-app-calculator">
    <div class="calc-screen" id="sim-test-result">Running...</div>
    <div style="font-size: 0.8rem; color: #a855f7; font-weight: bold; text-align: center;">自動化單元測試控制台</div>
    <div style="display: flex; flex-direction: column; gap: 0.4rem; font-family: var(--font-mono); font-size: 0.75rem; color: #8b949e;">
        <div>✔ Test standard price calculate: OK</div>
        <div>✔ Test book discount apply: OK</div>
        <div>✔ Test empty cart edgecase: OK</div>
        <div style="color: var(--accent-emerald); font-weight: 700; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.3rem;">✔ 3/3 Tests Passed (0ms)</div>
    </div>
</div>
            `
        },
        'rwd-test': {
            goalText: '請為本機運行的網頁 (localhost:3000) 執行響應式排版測試。需要在 1920x1080、768x1024 與 375x812 解析度下模擬瀏覽，自動截圖存檔，並驗證行動端的漢堡選單是否能正常運作。',
            planMD: `
# [NEW] 響應式介面驗證計畫

建立自動化網頁視覺比對計畫，防範跨解析度產生的排版文字溢出或按鈕失效。

## 擬使用工具與指令
*   **Chrome 視覺驅動自動化工具 (Browser Surface)**:
    - 啟動虛擬無頭瀏覽器，連接至本機埠。
    - 依序切換設定 Viewport 尺寸。
    - 生成視覺截圖 Artifact。

## 驗證計畫
1.  **螢幕寬度 1920px (Desktop)**: 確保導覽列完全平鋪顯示。
2.  **螢幕寬度 768px (Tablet)**: 確保網格佈局從 3 欄調整為 2 欄。
3.  **螢幕寬度 375px (Mobile)**: 確保頂部選單隱藏，並以「漢堡選單」按鈕替代。
            `,
            diffCode: `
<span class="c-num">1</span> <span class="add-line">+ // RWD 自動化視覺檢測測試碼</span>
<span class="c-num">2</span> <span class="add-line">+ const runRWDTests = async (browserInstance) => {</span>
<span class="c-num">3</span> <span class="add-line">+     const resolutions = [</span>
<span class="c-num">4</span> <span class="add-line">+         { width: 1920, height: 1080, name: 'desktop' },</span>
<span class="c-num">5</span> <span class="add-line">+         { width: 768, height: 1024, name: 'tablet' },</span>
<span class="c-num">6</span> <span class="add-line">+         { width: 375, height: 812, name: 'mobile' }</span>
<span class="c-num">7</span> <span class="add-line">+     ];</span>
<span class="c-num">8</span> <span class="add-line">+     for (let res of resolutions) {</span>
<span class="c-num">9</span> <span class="add-line">+         await browserInstance.setViewport(res.width, res.height);</span>
<span class="c-num">10</span> <span class="add-line">+         await browserInstance.screenshot(\`screenshot_\${res.name}.png\`);</span>
<span class="c-num">11</span> <span class="add-line">+     }</span>
<span class="c-num">12</span> <span class="add-line">+ };</span>
            `,
            browserURL: 'http://localhost:3000/e2e-rwd-check',
            browserViewportHTML: `
<div class="mock-app-rwd-view">
    <div style="font-size: 0.85rem; color: #ffffff; text-align: center; font-weight: bold;">模擬器三合一 E2E 響應式畫面</div>
    <div class="rwd-mock-frames">
        <div class="rwd-frame mobile">
            <div class="rwd-frame-title" style="font-size:0.5rem; background:#333; color:#fff;">Mobile</div>
            <div style="padding: 0.2rem; font-size: 0.4rem; color: #8b949e;">
                <div style="height:4px; width:100%; background:#8b5cf6; margin-bottom: 3px;"></div>
                <div style="height:2px; width:60%; background:#fff; margin-bottom: 2px;"></div>
                <div style="height:2px; width:40%; background:#fff;"></div>
            </div>
        </div>
        <div class="rwd-frame tablet">
            <div class="rwd-frame-title" style="font-size:0.5rem; background:#333; color:#fff;">Tablet</div>
            <div style="padding: 0.3rem; font-size: 0.4rem; color: #8b949e;">
                <div style="height:6px; width:100%; background:#8b5cf6; margin-bottom: 4px;"></div>
                <div style="display:flex; gap:3px;">
                    <div style="height:15px; width:45%; background:#222; border:1px solid #444;"></div>
                    <div style="height:15px; width:45%; background:#222; border:1px solid #444;"></div>
                </div>
            </div>
        </div>
        <div class="rwd-frame desktop">
            <div class="rwd-frame-title" style="font-size:0.5rem; background:#333; color:#fff;">Desktop</div>
            <div style="padding: 0.4rem; font-size: 0.4rem; color: #8b949e;">
                <div style="height:8px; width:100%; background:#8b5cf6; margin-bottom: 5px;"></div>
                <div style="display:flex; gap:4px;">
                    <div style="height:20px; width:30%; background:#222; border:1px solid #444;"></div>
                    <div style="height:20px; width:30%; background:#222; border:1px solid #444;"></div>
                    <div style="height:20px; width:30%; background:#222; border:1px solid #444;"></div>
                </div>
            </div>
        </div>
    </div>
    <div style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700; text-align: center;">
        <i class="fa-solid fa-circle-check"></i> 三解析度佈局對齊檢查：通過
    </div>
</div>
            `
        }
    };

    // 取得模擬器 DOM 元素
    const scenarioSelect = document.getElementById('sim-scenario');
    const goalTextContainer = document.getElementById('sim-goal-text');
    const startSimBtn = document.getElementById('btn-start-sim');
    const resetSimBtn = document.getElementById('btn-reset-sim');
    const statusVal = document.getElementById('sim-status-value');
    const screenTabs = document.getElementById('sim-screen-tabs');
    const terminalPanel = document.getElementById('panel-terminal');
    const planPanel = document.getElementById('panel-plan');
    const codePanel = document.getElementById('panel-code');
    const webPanel = document.getElementById('panel-web');
    const terminalLog = document.getElementById('sim-terminal-log');
    const planMdBox = document.getElementById('sim-plan-md');
    const diffContentBox = document.getElementById('sim-diff-content');
    const browserViewport = document.getElementById('sim-browser-viewport');
    const browserUrlBox = document.getElementById('sim-browser-url');
    const browserStatusBox = document.getElementById('sim-browser-status');
    const approvePlanBtn = document.getElementById('btn-approve-plan');
    const simPulse = document.getElementById('sim-pulse');
    const simActuatorText = document.getElementById('sim-actuator-text');

    // 模擬器運行狀態變數
    let currentScenarioKey = 'attendance';
    let simulationTimer = null;
    let isWaitingForApproval = false;

    // scenarioSelect 變更事件
    scenarioSelect.addEventListener('change', () => {
        currentScenarioKey = scenarioSelect.value;
        goalTextContainer.innerText = SCENARIOS[currentScenarioKey].goalText;
        resetSimulator();
    });

    // 頁籤點擊事件（只允許點擊非 disabled 的 tab）
    const tabHeaders = document.querySelectorAll('.tab-title');
    tabHeaders.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('disabled')) return;
            
            const targetPanelId = tab.getAttribute('data-panel');
            
            tabHeaders.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 隱藏所有 panel，顯示目標 panel
            [terminalPanel, planPanel, codePanel, webPanel].forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(targetPanelId).classList.add('active');
        });
    });

    // 啟動模擬按鈕
    startSimBtn.addEventListener('click', () => {
        startSimulation();
    });

    // 重設模擬按鈕
    resetSimBtn.addEventListener('click', () => {
        resetSimulator();
    });

    // 批准計畫按鈕
    approvePlanBtn.addEventListener('click', () => {
        if (isWaitingForApproval) {
            approvePlan();
        }
    });

    // 重置模擬器狀態
    function resetSimulator() {
        clearTimeout(simulationTimer);
        isWaitingForApproval = false;
        
        // 按鈕狀態
        startSimBtn.disabled = false;
        resetSimBtn.disabled = true;
        
        // 系統指示器
        simPulse.className = 'pulse-dot';
        simActuatorText.innerText = 'Offline';
        simActuatorText.style.color = 'var(--text-muted)';
        
        // 狀態標籤
        statusVal.className = 'sim-status-value idle';
        statusVal.innerText = '準備就緒，等待啟動...';
        
        // 頁籤重設 (除了終端機，其他都 disabled)
        tabHeaders.forEach((tab, index) => {
            if (index === 0) {
                tab.classList.add('active');
                tab.classList.remove('disabled');
            } else {
                tab.classList.remove('active');
                tab.classList.add('disabled');
            }
        });
        
        // Panel 顯示重設
        terminalPanel.classList.add('active');
        planPanel.classList.remove('active');
        codePanel.classList.remove('active');
        webPanel.classList.remove('active');
        
        // 內容清空
        terminalLog.innerHTML = `
            <div class="t-muted">// Antigravity 智慧工作流模擬器</div>
            <div class="t-muted">// 請於左側選擇情境並點擊「啟動 Agent 模擬」...</div>
        `;
        planMdBox.innerHTML = '';
        diffContentBox.innerHTML = '';
        browserViewport.innerHTML = '';
        browserUrlBox.innerText = 'http://localhost:3000';
        browserStatusBox.innerText = 'Offline';
    }

    // 新增終端機 Log 的輔助函式
    function printLog(text, type = 't-info') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = text;
        terminalLog.appendChild(line);
        terminalPanel.scrollTop = terminalPanel.scrollHeight;
    }

    // 啟動模擬狀態機
    function startSimulation() {
        resetSimulator();
        
        startSimBtn.disabled = true;
        resetSimBtn.disabled = false;
        
        // 變更執行狀態為 Running
        statusVal.className = 'sim-status-value running';
        statusVal.innerText = '正在執行 (Running)';
        simPulse.className = 'pulse-dot active';
        simActuatorText.innerText = 'Actuator Active';
        simActuatorText.style.color = 'var(--accent-emerald)';

        // 步驟 1：初始化研究 (Research Phase)
        printLog('<span class="t-prompt">$</span> antigravity start --goal "' + SCENARIOS[currentScenarioKey].goalText.substring(0, 20) + '..."', 't-input');
        
        simulationTimer = setTimeout(() => {
            printLog('[System] 開始掃描本機工作區...');
            printLog('[System] 分析專案目錄與設定檔...');
            
            simulationTimer = setTimeout(() => {
                printLog('[Research] 正在針對使用者目標搜尋知識原理與依賴項目...');
                if (currentScenarioKey === 'attendance') {
                    printLog('[Research] 搜尋關鍵字: "HTML5 出缺席登記表", "毛玻璃 HSL 顏色樣式表"');
                } else if (currentScenarioKey === 'calculator') {
                    printLog('[Research] 搜尋關鍵字: "JavaScript Array reduce", "購物車折扣計算 JSDoc"');
                } else {
                    printLog('[Research] 搜尋關鍵字: "Chrome automation screenshot", "自動化測試 RWD 視窗"');
                }
                
                // 步驟 2：計畫階段 (Planning Phase)
                simulationTimer = setTimeout(() => {
                    printLog('[Plan] 自主拆解步驟，開始建立實作計畫書...');
                    printLog('[Plan] 寫入 Artifact: <span class="t-link" onclick="focusSimTab(\'tab-sim-plan\')">implementation_plan.md</span>');
                    
                    // 渲染 Plan MD
                    const planHtml = parseSimpleMarkdown(SCENARIOS[currentScenarioKey].planMD);
                    planMdBox.innerHTML = planHtml;
                    
                    // 開放 Plan 頁籤並切換過去
                    document.getElementById('tab-sim-plan').classList.remove('disabled');
                    focusSimTab('tab-sim-plan');
                    
                    // 進入等待批准狀態
                    statusVal.className = 'sim-status-value waiting';
                    statusVal.innerText = '等待批准 (Waiting)';
                    simPulse.className = 'pulse-dot waiting';
                    simActuatorText.innerText = 'Suspended (Gate)';
                    simActuatorText.style.color = 'var(--accent-amber)';
                    isWaitingForApproval = true;
                    printLog('[Wait] 實作計畫已就緒。為保障代碼安全與教學評估，Agent 已暫停，等待使用者審查與批准。', 't-warning');
                    
                }, 2000);
            }, 1800);
        }, 1000);
    }

    // 批准計畫
    function approvePlan() {
        isWaitingForApproval = false;
        
        // 恢復運行狀態
        statusVal.className = 'sim-status-value running';
        statusVal.innerText = '正在執行 (Running)';
        simPulse.className = 'pulse-dot active';
        simActuatorText.innerText = 'Actuator Active';
        simActuatorText.style.color = 'var(--accent-emerald)';
        
        // 隱藏 Approve Gate，將 Plan Badge 改為「已批准」
        approvePlanBtn.parentElement.style.display = 'none';
        planPanel.querySelector('.plan-badge').innerText = '已核准';
        planPanel.querySelector('.plan-badge').style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        planPanel.querySelector('.plan-badge').style.color = 'var(--accent-emerald)';
        planPanel.querySelector('.plan-badge').style.borderColor = 'rgba(16, 185, 129, 0.3)';
        
        focusSimTab('tab-title'); // 切回 terminal
        printLog('[User] 批准此計畫，授權 Agent 開始執行。', 't-input');
        
        // 步驟 3：代碼寫入階段 (Execution - Code writing)
        simulationTimer = setTimeout(() => {
            printLog('[Execute] 建立待辦工作清單 Artifact: <span class="t-link">task.md</span>');
            printLog('[Execute] [1/2] 正在套用代碼變更...');
            
            // 寫入 Diff Code 到對比 panel
            diffContentBox.innerHTML = SCENARIOS[currentScenarioKey].diffCode;
            document.getElementById('tab-sim-code').classList.remove('disabled');
            
            simulationTimer = setTimeout(() => {
                focusSimTab('tab-sim-code'); // 切到 Diff panel 讓使用者看
                printLog('[Execute] [2/2] 成功修改原始碼檔案！');
                
                // 步驟 4：自動化驗證階段 (Verification - Browser E2E)
                simulationTimer = setTimeout(() => {
                    printLog('[Browser] 正在部屬本機環境，準備啟動視覺化驗證...');
                    printLog('[Browser] 啟動 Chrome 無頭瀏覽器，導覽至: ' + SCENARIOS[currentScenarioKey].browserURL);
                    
                    document.getElementById('tab-sim-web').classList.remove('disabled');
                    focusSimTab('tab-sim-web'); // 切到瀏覽器
                    
                    browserUrlBox.innerText = SCENARIOS[currentScenarioKey].browserURL;
                    browserStatusBox.innerText = 'Loading...';
                    browserViewport.innerHTML = '<div style="color: var(--text-secondary); font-family: var(--font-mono);"><i class="fa-solid fa-circle-notch fa-spin"></i> 正在渲染虛擬頁面...</div>';
                    
                    simulationTimer = setTimeout(() => {
                        // 載入完成，顯示模擬 app 介面
                        browserStatusBox.innerText = '200 OK';
                        browserViewport.innerHTML = SCENARIOS[currentScenarioKey].browserViewportHTML;
                        
                        // 若是 calculator 情境，加載 1.5 秒後將螢幕文字修改為單元測試成功
                        if (currentScenarioKey === 'calculator') {
                            setTimeout(() => {
                                const tr = document.getElementById('sim-test-result');
                                if (tr) tr.innerText = 'PASS';
                            }, 1000);
                        }
                        
                        printLog('[Browser] 頁面載入成功！開始模擬滑鼠點擊與響應式螢幕拉伸測試...');
                        
                        simulationTimer = setTimeout(() => {
                            printLog('[Browser] 自動擷取網頁視覺截圖，並寫入 Walkthrough 報告。');
                            printLog('[System] 成功產出交付報告 Artifact: <span class="t-link">walkthrough.md</span>');
                            
                            // 步驟 5：完成階段 (Success Phase)
                            statusVal.className = 'sim-status-value success';
                            statusVal.innerText = '任務成功 (Success)';
                            simPulse.className = 'pulse-dot';
                            simActuatorText.innerText = 'Task Completed';
                            simActuatorText.style.color = 'var(--accent-emerald)';
                            
                            focusSimTab('tab-title'); // 切回終端機
                            printLog('[System] 恭喜！所有任務與驗證皆已自主完成。耗時約 15 秒。', 't-success');
                            
                        }, 2500);
                    }, 1500);
                }, 2000);
            }, 1800);
        }, 1200);
    }

    // 輔助函式：切換模擬器內部頁籤的視覺顯示
    window.focusSimTab = function(tabId) {
        let matchedTab = null;
        if (tabId === 'tab-title') {
            matchedTab = document.querySelector('.tab-title[data-panel="panel-terminal"]');
        } else {
            matchedTab = document.getElementById(tabId);
        }
        
        if (matchedTab && !matchedTab.classList.contains('disabled')) {
            tabHeaders.forEach(t => t.classList.remove('active'));
            matchedTab.classList.add('active');
            
            const targetPanelId = matchedTab.getAttribute('data-panel');
            [terminalPanel, planPanel, codePanel, webPanel].forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(targetPanelId).classList.add('active');
        }
    };

    // 輔助函式：將 Plan 的簡化版 Markdown 轉換成 HTML 渲染
    function parseSimpleMarkdown(md) {
        if (!md) return '';
        let lines = md.split('\n');
        let html = '';
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('# ')) {
                html += `<h1>${line.substring(2)}</h1>`;
            } else if (line.startsWith('## ')) {
                html += `<h2>${line.substring(3)}</h2>`;
            } else if (line.startsWith('### ')) {
                html += `<h3>${line.substring(4)}</h3>`;
            } else if (line.startsWith('* ') || line.startsWith('- ')) {
                // 更換連結格式 [link text](file://...) 為 HTML 標籤
                let liText = line.substring(2);
                liText = liText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="t-link" onclick="window.open(\'$2\')">$1</span>');
                html += `<ul><li>${liText}</li></ul>`;
            } else if (line.length > 0) {
                html += `<p>${line}</p>`;
            }
        });
        return html;
    }

    // 虛擬瀏覽器中的出缺席按鈕點擊切換事件 (Scenario 1 專用)
    window.toggleSimAttendance = function(btn) {
        const row = btn.closest('.student-row');
        if (row) {
            const buttons = row.querySelectorAll('.attendance-btn-mini');
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    };

});
