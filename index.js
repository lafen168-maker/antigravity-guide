/* ==========================================================================
   Antigravity 一站式介紹網頁 - 核心 JavaScript 邏輯 (更新為桌面版 2.0 版)
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
        if (window.scrollY > 20) {
            header.style.backgroundColor = 'var(--glass-bg)';
            header.style.boxShadow = 'var(--nav-shadow)';
        } else {
            header.style.backgroundColor = 'var(--glass-bg)';
        }

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
    // 3. Tabs 切換功能 (三大介面配置與 Prompt 範本)
    // ==========================================================================
    
    // 三大佈局區塊 Tabs
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
    // 5. Antigravity 2.0 智慧模擬器狀態機 (三欄式佈局)
    // ==========================================================================
    
    // 模擬情境數據定義
    const SCENARIOS = {
        attendance: {
            projectName: 'class-attendance-system',
            goalText: '請建立一個繁體中文的班級出缺席登記網頁，需具備新增學生、勾選出勤狀態（出席、遲到、缺席）以及統計圖表功能。介面使用深色高質感玻璃擬態設計。',
            planMD: `
# [NEW] 班級出缺席登記網頁實作計畫

本計畫旨在建立一個網頁版出缺席登記系統。支援動態名單登載與即時狀態統計。

## 擬修改與新建的檔案
*   **[NEW] [index.html](file:///c:/AIagent_Antigravity/attendance/index.html)**: 建立玻璃擬態的 APP 容器、學生名單 DOM 及統計表格。
*   **[NEW] [style.css](file:///c:/AIagent_Antigravity/attendance/style.css)**: HSL 暗色調樣式，搭配 backdrop-filter 毛玻璃特效。
*   **[NEW] [app.js](file:///c:/AIagent_Antigravity/attendance/app.js)**: 提供出勤狀態切換、本地存儲、以及數據加載邏輯。

## 驗證計畫
1.  **自動化測試**:
    - 啟動 localhost 伺服器並載入頁面。
    - 模擬滑鼠點擊出勤按鈕，檢查狀態值是否即時變更。
2.  **視覺與響應式**:
    - 確保在手機尺寸 (375x812) 下，名單表格可自動滾動。
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
            projectName: 'student-cart-project',
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
    - 模擬一般商品、書籍折價商品及邊界極限值，比對重構前與重構後的金額是否 100% 一致。
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
            projectName: 'school-homepage-check',
            goalText: '請為本機運行的網頁 (localhost:3000) 執行響應式排版測試。需要在 1920x1080、768x1024 與 375x812 解析度下模擬瀏覽，自動截圖存檔，並驗證行動端的漢堡選單是否能正常運作。',
            planMD: `
# [NEW] 響應式介面驗證計畫

建立自動化網頁視覺比對計畫，防範跨解析度產生的排版文字溢出或按鈕失效。

## 擬使用工具與指令
*   **Chrome 視覺驅動自動化工具 (Browser Surface)**:
    - 啟動虛擬無頭瀏覽器，連接至本機埠。
    - 依序切換設定 Viewport 尺寸並產生視覺截圖。

## 驗證計畫
1.  **螢幕寬度 1920px (Desktop)**: 確保導覽列完全平鋪顯示。
2.  **螢幕寬度 768px (Tablet)**: 確保網格佈局從 3 欄調整為 2 欄。
3.  **螢幕寬度 375px (Mobile)**: 確保頂部選單隱藏，以「漢堡選單」替代。
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
    
    const projectNameLabel = document.getElementById('sim-proj-name');
    const chatBox = document.getElementById('sim-chat-box');
    const contextBtn = document.getElementById('btn-sim-context');
    const dropdownMenu = document.getElementById('sim-dropdown-menu');
    const inputTextPlaceholder = document.getElementById('sim-input-text-placeholder');

    const artTabPlan = document.getElementById('art-tab-plan');
    const artTabDiff = document.getElementById('art-tab-diff');
    const artTabProof = document.getElementById('art-tab-proof');

    const panelPlan = document.getElementById('sim-panel-plan');
    const panelDiff = document.getElementById('sim-panel-diff');
    const panelProof = document.getElementById('sim-panel-proof');

    const planMdBox = document.getElementById('sim-plan-md-box');
    const planBadge = document.getElementById('sim-plan-badge');
    const diffBox = document.getElementById('sim-diff-box');
    const browserViewport = document.getElementById('sim-browser-viewport');
    const browserUrlText = document.getElementById('sim-browser-url-text');
    const browserStatusBadge = document.getElementById('sim-browser-status-badge');
    const approveGate = document.getElementById('sim-approval-gate');
    const approvePlanBtn = document.getElementById('btn-approve-plan');

    const simPulse = document.getElementById('sim-pulse');
    const simActuatorText = document.getElementById('sim-actuator-text');

    // 模擬器運行狀態變數
    let currentScenarioKey = 'attendance';
    let simulationTimer = null;
    let isWaitingForApproval = false;

    // 初始狀態設置
    projectNameLabel.innerText = SCENARIOS[currentScenarioKey].projectName;
    goalTextContainer.innerText = SCENARIOS[currentScenarioKey].goalText;

    // scenarioSelect 變更事件
    scenarioSelect.addEventListener('change', () => {
        currentScenarioKey = scenarioSelect.value;
        goalTextContainer.innerText = SCENARIOS[currentScenarioKey].goalText;
        projectNameLabel.innerText = SCENARIOS[currentScenarioKey].projectName;
        resetSimulator();
    });

    // 右側 Artifacts 頁籤切換事件
    const artTabs = [artTabPlan, artTabDiff, artTabProof];
    const artPanels = [panelPlan, panelDiff, panelProof];

    artTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('disabled')) return;
            
            const targetPanelId = tab.getAttribute('data-tab-panel');
            
            artTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            artPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(targetPanelId).classList.add('active');
        });
    });

    // Toggle Add Context 選單顯示
    contextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdownMenu.style.display === 'flex') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'flex';
        }
    });

    // 點擊空白處關閉選單
    document.addEventListener('click', () => {
        dropdownMenu.style.display = 'none';
    });

    // 模擬選單項目點擊
    window.triggerSimDropdownAction = function(type) {
        addChatMessage('user', `<i class="fa-solid fa-plus-circle"></i> [Added Context: ${type}]`, false);
        dropdownMenu.style.display = 'none';
    };

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
        
        // 按鈕與輸入框重置
        startSimBtn.disabled = false;
        resetSimBtn.disabled = true;
        inputTextPlaceholder.innerText = '輸入您的 Prompt 或使用 Add Context...';
        inputTextPlaceholder.style.color = 'var(--text-muted)';
        
        // 系統指示器
        simPulse.className = 'app-pulse-dot';
        simActuatorText.innerText = 'Offline';
        simActuatorText.style.color = 'var(--text-muted)';
        
        // 狀態標籤
        statusVal.className = 'sim-status-value idle';
        statusVal.innerText = '準備就緒，等待啟動...';
        
        // 頁籤重設 (除了計畫，其他都 disabled)
        artTabs.forEach((tab, index) => {
            if (index === 0) {
                tab.classList.add('active');
                tab.classList.remove('disabled');
            } else {
                tab.classList.remove('active');
                tab.classList.add('disabled');
            }
        });
        
        // Panel 顯示重設
        panelPlan.classList.add('active');
        panelDiff.classList.remove('active');
        panelProof.classList.remove('active');
        
        // 對話與產物內容清空
        chatBox.innerHTML = `
            <div class="sim-chat-message bot">
                <div class="msg-sender"><i class="fa-solid fa-robot"></i> Antigravity Agent</div>
                <div class="msg-text">您好！我是 Antigravity。已成功載入專案資料夾。請點擊左側「啟動 Agent 模擬」開始演示。</div>
            </div>
        `;
        
        planMdBox.innerHTML = `<div class="art-placeholder-text">Agent 啟動後，實作計畫書將會在此動態呈現。</div>`;
        planBadge.innerText = '尚未生成';
        planBadge.style.backgroundColor = 'rgba(255,255,255,0.03)';
        planBadge.style.color = 'var(--text-muted)';
        planBadge.style.borderColor = 'var(--border-color)';
        
        approveGate.style.display = 'none';
        diffBox.innerHTML = '';
        browserViewport.innerHTML = '';
        browserUrlText.innerText = 'http://localhost:3000';
        browserStatusBadge.innerText = 'Offline';

        // 左側檔案樹 active 移除
        document.querySelectorAll('.sim-proj-file').forEach(f => f.classList.remove('active'));
    }

    // 新增聊天訊息的輔助函式
    function addChatMessage(sender, text, hasHeader = true) {
        const bubble = document.createElement('div');
        bubble.className = `sim-chat-message ${sender}`;
        
        let contentHTML = '';
        if (hasHeader) {
            if (sender === 'user') {
                contentHTML += `<div class="msg-sender"><i class="fa-solid fa-user"></i> 您</div>`;
            } else {
                contentHTML += `<div class="msg-sender"><i class="fa-solid fa-robot"></i> Antigravity Agent</div>`;
            }
        }
        contentHTML += `<div class="msg-text">${text}</div>`;
        bubble.innerHTML = contentHTML;
        
        chatBox.appendChild(bubble);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 啟動模擬狀態機
    function startSimulation() {
        resetSimulator();
        
        startSimBtn.disabled = true;
        resetSimBtn.disabled = false;
        
        // 變更執行狀態為 Running
        statusVal.className = 'sim-status-value running';
        statusVal.innerText = '正在執行 (Running)';
        simPulse.className = 'app-pulse-dot active';
        simActuatorText.innerText = 'Actuator Active';
        simActuatorText.style.color = 'var(--accent-emerald)';

        // 1. 使用者送出對話
        addChatMessage('user', SCENARIOS[currentScenarioKey].goalText);
        inputTextPlaceholder.innerText = 'Agent 正在工作中，請稍候...';
        inputTextPlaceholder.style.color = 'var(--text-muted)';

        // 2. 步驟 1：初始化研究 (Research Phase)
        simulationTimer = setTimeout(() => {
            addChatMessage('bot', `<i class="fa-solid fa-circle-notch fa-spin"></i> 正在掃描本機專案目錄 <code>c:\\AIagent_Antigravity</code> 並探查環境依賴...`);
            
            // 左側專案檔案高亮，模擬 Agent 正在檢查這些檔案
            document.querySelectorAll('.sim-proj-file').forEach(f => f.classList.add('active'));

            simulationTimer = setTimeout(() => {
                addChatMessage('bot', `🔍 啟動背景子 Agent 執行相關知識搜尋，已分析完成。正在為您編寫實作計畫書...`);
                
                // 3. 步驟 2：計畫階段 (Planning Phase)
                simulationTimer = setTimeout(() => {
                    addChatMessage('bot', `✨ 實作計畫已生成！請在右側面板審查 <code>implementation_plan.md</code>。<strong>Agent 已暫停，等待您的核准。</strong>`);
                    
                    // 渲染 Plan MD
                    const planHtml = parseSimpleMarkdown(SCENARIOS[currentScenarioKey].planMD);
                    planMdBox.innerHTML = planHtml;
                    
                    // 更新計畫狀態 Badge
                    planBadge.innerText = '等待核准';
                    planBadge.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
                    planBadge.style.color = 'var(--accent-amber)';
                    planBadge.style.borderColor = 'rgba(245, 158, 11, 0.3)';

                    // 顯示核准審查閘門 (Approve Gate)
                    approveGate.style.display = 'flex';
                    
                    // 確保 Plan 頁籤是打開並 Active
                    focusArtifactTab('art-tab-plan');
                    
                    // 進入等待批准狀態
                    statusVal.className = 'sim-status-value waiting';
                    statusVal.innerText = '等待審查 (Waiting)';
                    simPulse.className = 'app-pulse-dot waiting';
                    simActuatorText.innerText = 'Suspended (Approval Gate)';
                    simActuatorText.style.color = 'var(--accent-amber)';
                    isWaitingForApproval = true;
                    
                }, 2000);
            }, 1800);
        }, 1200);
    }

    // 批准計畫
    function approvePlan() {
        isWaitingForApproval = false;
        
        // 恢復運行狀態
        statusVal.className = 'sim-status-value running';
        statusVal.innerText = '正在執行 (Running)';
        simPulse.className = 'app-pulse-dot active';
        simActuatorText.innerText = 'Actuator Active';
        simActuatorText.style.color = 'var(--accent-emerald)';
        
        // 隱藏 Approve Gate，將 Plan Badge 改為「已核准」
        approveGate.style.display = 'none';
        planBadge.innerText = '已核准';
        planBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        planBadge.style.color = 'var(--accent-emerald)';
        planBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        
        addChatMessage('user', '我已審查並批准此實作計畫，請開始執行。');
        
        // 4. 步驟 3：代碼寫入階段 (Execution - Code writing)
        simulationTimer = setTimeout(() => {
            addChatMessage('bot', `⚙️ 開始進行程式碼寫入。正在右側產生任務追蹤清單 <code>task.md</code>...`);
            
            simulationTimer = setTimeout(() => {
                // 寫入 Diff Code 到對比 panel，並開啟頁籤
                diffBox.innerHTML = SCENARIOS[currentScenarioKey].diffCode;
                artTabDiff.classList.remove('disabled');
                focusArtifactTab('art-tab-diff'); // 切換到 Diff 讓使用者看
                
                addChatMessage('bot', `📝 正在對程式碼進行精確的區塊替換 (replace_file_content)...`);
                
                simulationTimer = setTimeout(() => {
                    addChatMessage('bot', `✅ 程式碼替換已完成。準備啟動自動化 Chrome 瀏覽器以驗證視覺排版與 E2E 流程...`);
                    
                    // 5. 步驟 4：自動化驗證階段 (Verification)
                    simulationTimer = setTimeout(() => {
                        artTabProof.classList.remove('disabled');
                        focusArtifactTab('art-tab-proof'); // 切換到 Browser 頁籤
                        
                        browserUrlText.innerText = SCENARIOS[currentScenarioKey].browserURL;
                        browserStatusBadge.innerText = 'Loading...';
                        browserViewport.innerHTML = '<div style="color: var(--text-secondary); font-family: var(--font-mono);"><i class="fa-solid fa-circle-notch fa-spin"></i> 正在叫起 Chrome 並渲染頁面...</div>';
                        
                        simulationTimer = setTimeout(() => {
                            // 載入完成，顯示模擬 app 介面
                            browserStatusBadge.innerText = '200 OK';
                            browserViewport.innerHTML = SCENARIOS[currentScenarioKey].browserViewportHTML;
                            
                            if (currentScenarioKey === 'calculator') {
                                setTimeout(() => {
                                    const tr = document.getElementById('sim-test-result');
                                    if (tr) tr.innerText = 'PASS';
                                }, 1000);
                            }
                            
                            addChatMessage('bot', `🌐 瀏覽器渲染完成。正在模擬滑鼠點擊、調整多種尺寸進行 RWD 檢測...`);
                            
                            simulationTimer = setTimeout(() => {
                                addChatMessage('bot', `📸 測試全部通過！已自動截圖，並在右側產生交付說明書 <code>walkthrough.md</code>。`);
                                
                                // 6. 步驟 5：完成階段 (Success Phase)
                                statusVal.className = 'sim-status-value success';
                                statusVal.innerText = '任務成功 (Success)';
                                simPulse.className = 'app-pulse-dot';
                                simActuatorText.innerText = 'Completed';
                                simActuatorText.style.color = 'var(--accent-emerald)';
                                
                                inputTextPlaceholder.innerText = '任務已完成！可點選重設模擬器。';
                                addChatMessage('bot', `🎉 所有工作已成功自主完成！共計修改 3 個檔案，耗時約 15 秒。歡迎隨時體驗其他模擬場景。`);
                                
                            }, 2500);
                        }, 1500);
                    }, 2000);
                }, 1800);
            }, 1500);
        }, 1000);
    }

    // 輔助函式：切換模擬器右側 Artifacts 頁籤的顯示
    window.focusArtifactTab = function(tabId) {
        const matchedTab = document.getElementById(tabId);
        if (matchedTab && !matchedTab.classList.contains('disabled')) {
            artTabs.forEach(t => t.classList.remove('active'));
            matchedTab.classList.add('active');
            
            const targetPanelId = matchedTab.getAttribute('data-tab-panel');
            artPanels.forEach(panel => {
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
