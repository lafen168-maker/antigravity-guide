/* ==========================================================================
   Antigravity 一站式介紹網頁 - 核心 JavaScript 邏輯 (更新為桌面版 2.0 版 + 互動導覽)
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
    
    // 三大佈局區塊 Tabs (已整合於互動導覽中，此處保留舊架構相容點，並將事件指向導覽)
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
    // 5. 互動式介面導覽與設定面板詳解邏輯 (UI Tour)
    // ==========================================================================
    
    // 熱點詳細資料庫 (繁體中文)
    const TOUR_DATA = {
        // 1. Projects
        p1: {
            title: 'New Project (建立新專案)',
            body: `
<p><strong>功能用途：</strong><br>在 Antigravity 2.0 桌面版中，您可以點擊此按鈕建立一個獨立的開發專案。這會為 Agent 建立一個獨立的資料快取與日誌區，避免多個專案之間的程式碼上下文相互干擾。</p>
<p><strong>推薦用法：</strong><br>每當您要建立新的學科作業（如：網頁製作、資料庫分析）時，都應為該主題新建一個 Project。</p>
            `
        },
        p2: {
            title: 'Active Project Info (作用中專案資訊)',
            body: `
<p><strong>功能用途：</strong><br>呈現目前選取專案的名稱、Git 目前分支以及專案底下的檔案數量統計。</p>
<p><strong>重要註記：</strong><br>Antigravity 2.0 與傳統編輯器的不同之處在於，此處的專案就像一個『指揮中心』，可以同時掛載多個資料夾，讓 Agent 理解跨目錄的全域資訊，進行整體架構設計。</p>
            `
        },
        p3: {
            title: 'Add Context Folder (加入本地工作目錄)',
            body: `
<p><strong>功能用途：</strong><br>將您本機電腦硬碟中的任何資料夾載入到這個專案中。載入後，該資料夾下的所有檔案皆會成為 Agent 的感知環境，Agent 可以在這裡建立新檔案、修改現有代碼。</p>
<p><strong>安全防範：</strong><br>Agent 預設**只能**對被您加入的資料夾進行檔案讀寫，這形成了本機的安全沙盒，保護您電腦其他硬碟目錄的安全。</p>
            `
        },
        // 2. Chat
        c1: {
            title: 'System Status Indicator (系統狀態指示燈)',
            body: `
<p><strong>功能用途：</strong><br>實時顯示 Actuator（執行驅動器）與 Agent 的運作狀態：</p>
<ul>
    <li>🟢 <strong>Active (執行中)</strong>：Agent 正在背景掃描、研究或修改程式。</li>
    <li>🟡 <strong>Suspended (暫停中)</strong>：通常停在 Approval Gate（核准閘門），等待您核准實作計畫。</li>
    <li>⚪ <strong>Offline (離線/就緒)</strong>：目前處於空閒狀態，隨時可接收新任務。</li>
</ul>
            `
        },
        c2: {
            title: 'Add Context Menu (新增上下文選單)',
            body: `
<p><strong>功能用途：</strong><br>這就是選單按鈕！它允許您在發送 Prompt 前，為對話附加各式各樣的「資訊背景」：</p>
<ul>
    <li>🖼️ <strong>Media (媒體)</strong>：上傳有問題的畫面對照圖，讓 AI 用眼睛看著修。</li>
    <li>🏷️ <strong>Mentions (提及)</strong>：使用 <code>@</code> 符號直接在對話中指名某個特定的檔案或程式碼。</li>
    <li>⚡ <strong>Actions (快捷指令)</strong>：執行平台預設的工作流程。</li>
    <li>🌐 <strong>Browser (瀏覽器)</strong>：與當前開啟的本機網頁整合，將網址、DOM 元件狀態等即時附加。</li>
</ul>
            `
        },
        c3: {
            title: 'Slash Commands Helper (斜線指令小助手)',
            body: `
<p><strong>功能用途：</strong><br>在對話輸入框中輸入 <code>/</code> 即可快速叫出快捷命令。常用的包含：</p>
<ul>
    <li><code>/goal</code>：開啟極致細心的終極長任務模式。</li>
    <li><code>/schedule</code>：設定定時或 cron 定期排程任務。</li>
    <li><code>/browser</code>：將任務重心設定為網頁爬蟲與視覺 UI 驗證。</li>
    <li><code>/grill-me</code>：讓 Agent 用問答選擇題方式對齊不清楚的細節。</li>
</ul>
            `
        },
        // 3. Artifacts
        a1: {
            title: 'Artifacts Tabs (產物分頁切換)',
            body: `
<p><strong>功能用途：</strong><br>切換審查 Agent 在執行過程中生成的各種「交付產物（Artifacts）」：</p>
<ul>
    <li><code>implementation_plan.md</code>：開發前自主設計的實作計畫書。</li>
    <li><code>task.md</code>：執行中自動打勾的工作清單。</li>
    <li><code>walkthrough.md</code>：完成後的成果交付報告。</li>
    <li><code>Visual Proof</code>：虛擬無頭瀏覽器的自動測試截圖與錄影。</li>
</ul>
            `
        },
        a2: {
            title: '雙向回饋與批註 (Artifacts Commenting)',
            body: `
<p><strong>功能用途：</strong><br>這是 Antigravity 2.0 最具革命性的設計。您可以直接選取實作計畫中的特定程式碼，或是選取視覺驗證截圖的某個區塊，留下類似 Google Docs 的『註解留言』。Agent 會即時讀取您的指教，並自動重新修改代碼，不需要重新撰寫長篇大論的 Prompt。</p>
            `
        },
        a3: {
            title: 'Approve Gate (審查核准閘門)',
            body: `
<p><strong>功能用途：</strong><br>為了保護代碼安全與建立人機信任，Agent 規劃好計畫書後，在動手改代碼前會在此暫停，等待您的審查核准。點擊後才正式進入寫入階段。</p>
<p><strong>教學應用：</strong><br>老師可以指導學生在此關卡評估 Agent 的設計是否符合演算法邏輯，以此訓練學生的系統架構審查能力。</p>
            `
        },
        // 4. Settings
        s1: {
            title: '模型選擇設定 (Model Selection)',
            body: `
<p><strong>功能用途：</strong><br>在下拉選單中可以切換不同的 Gemini 核心模型：</p>
<ul>
    <li>🧠 <strong>Gemini 3.5 Pro (推薦)</strong>：具備極強的邏輯推理能力，最適合複雜的程式架構規劃與錯誤排查。</li>
    <li>⚡ <strong>Gemini 3.5 Flash</strong>：生成與回覆速度極快，適合執行快速修改或簡單的文字處理任務。</li>
</ul>
            `
        },
        s2: {
            title: '沙盒權限規則 (Sandbox Rules)',
            body: `
<p><strong>功能用途：</strong><br>用來設定本機的硬碟存取與終端機指令權限防護：</p>
<ul>
    <li><strong>限制寫入目錄</strong>：強制 Agent 只能對被您手動掛載的專案資料夾進行修改，保護系統其他核心目錄。</li>
    <li><strong>指令審查機制</strong>：當 Agent 要在您的本機運行終端機編譯或測試命令時，必須先彈出視窗獲得您的手動同意，防止運行有害代碼。</li>
</ul>
            `
        },
        s3: {
            title: 'MCP 擴充伺服器 (Model Context Protocol)',
            body: `
<p><strong>功能用途：</strong><br>這是一個開源協定。您可以設定將外部的自訂工具（如：資料庫查詢、API 工具、硬體控制指令）作為「擴充插件」提供給 Agent。這能讓 Agent 擁有分析本機 SQLite 資料庫或調用特定系統工具的能力。</p>
            `
        },
        s4: {
            title: '自訂全域規則 (Custom System Guidelines)',
            body: `
<p><strong>功能用途：</strong><br>在此文字輸入框中填寫您的全域開發方針。例如：『始終以繁體中文撰寫代碼註解』、『採用 Airbnb 的 JavaScript 程式規範』等。</p>
<p><strong>教學應用：</strong><br>老師可在這裡填寫『教具規範』，強制 Agent 在引導學生時「只給提示和架構，不直接寫出最終答案」，藉此訓練學生的自主思考。</p>
            `
        }
    };

    const tourTabButtons = document.querySelectorAll('.tour-tab-btn');
    const tourScreens = document.querySelectorAll('.tour-screen');
    const tourDetailTitle = document.getElementById('tour-detail-title');
    const tourDetailBody = document.getElementById('tour-detail-body');
    const tourWindowTitle = document.getElementById('tour-window-title');

    // 切換畫面 Tabs
    tourTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetScreenId = btn.getAttribute('data-tour');
            
            tourTabButtons.forEach(b => b.classList.remove('active'));
            tourScreens.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            const targetScreen = document.getElementById(targetScreenId);
            targetScreen.classList.add('active');

            // 更新虛擬視窗標題
            if (targetScreenId === 'tour-projects') {
                tourWindowTitle.innerText = 'Antigravity 2.0 - Projects Explorer';
            } else if (targetScreenId === 'tour-chat') {
                tourWindowTitle.innerText = 'Antigravity 2.0 - Chat & Context Actuator';
            } else if (targetScreenId === 'tour-artifacts') {
                tourWindowTitle.innerText = 'Antigravity 2.0 - Artifacts & Trust Layer';
            } else if (targetScreenId === 'tour-settings') {
                tourWindowTitle.innerText = 'Antigravity 2.0 - System Settings';
            }

            // 自動觸發選取該畫面底下的「第一個熱點」
            const firstHotspot = targetScreen.querySelector('.hotspot');
            if (firstHotspot) {
                firstHotspot.click();
            }
        });
    });

    // 熱點點擊事件
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(spot => {
        spot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // 移除其他熱點 active 樣式
            hotspots.forEach(s => s.classList.remove('active'));
            spot.classList.add('active');

            // 取得詳細說明的 ID
            const spotId = spot.getAttribute('data-id');
            const data = TOUR_DATA[spotId];

            if (data) {
                // 更新右側說明看板
                tourDetailTitle.innerText = data.title;
                tourDetailBody.innerHTML = data.body;
            }
        });
    });

    // 預設點擊第一個畫面 (Projects) 的第一個熱點
    const defaultHotspot = document.querySelector('#tour-projects .hotspot');
    if (defaultHotspot) {
        defaultHotspot.click();
    }


    // ==========================================================================
    // 6. Antigravity 2.0 智慧模擬器狀態機 (三欄式佈局)
    // ==========================================================================
    
    // 取得模擬器 DOM 元素
    const simScenarioSelect = document.getElementById('sim-scenario');
    const simGoalTextContainer = document.getElementById('sim-goal-text');
    const simStartBtn = document.getElementById('btn-start-sim');
    const simResetBtn = document.getElementById('btn-reset-sim');
    const simStatusVal = document.getElementById('sim-status-value');
    
    const simProjectNameLabel = document.getElementById('sim-proj-name');
    const simChatBox = document.getElementById('sim-chat-box');
    const simContextBtn = document.getElementById('btn-sim-context');
    const simDropdownMenu = document.getElementById('sim-dropdown-menu');
    const simInputPlaceholder = document.getElementById('sim-input-text-placeholder');

    const simTabPlan = document.getElementById('art-tab-plan');
    const simTabDiff = document.getElementById('art-tab-diff');
    const simTabProof = document.getElementById('art-tab-proof');

    const simPanelPlan = document.getElementById('sim-panel-plan');
    const simPanelDiff = document.getElementById('sim-panel-diff');
    const simPanelProof = document.getElementById('sim-panel-proof');

    const simPlanMdBox = document.getElementById('sim-plan-md-box');
    const simPlanBadge = document.getElementById('sim-plan-badge');
    const simDiffBox = document.getElementById('sim-diff-box');
    const simBrowserViewport = document.getElementById('sim-browser-viewport');
    const simBrowserUrlText = document.getElementById('sim-browser-url-text');
    const simBrowserStatusBadge = document.getElementById('sim-browser-status-badge');
    const simApproveGate = document.getElementById('sim-approval-gate');
    const simApproveBtn = document.getElementById('btn-approve-plan');

    const simAppPulse = document.getElementById('sim-pulse');
    const simActuatorText = document.getElementById('sim-actuator-text');

    // 模擬器運行狀態變數
    let simCurrentScenarioKey = 'attendance';
    let simTimer = null;
    let simIsWaitingForApproval = false;

    // 頁籤切換事件 (Simulator 右側)
    const simTabs = [simTabPlan, simTabDiff, simTabProof];
    const simPanels = [simPanelPlan, simPanelDiff, simPanelProof];

    simTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('disabled')) return;
            
            const targetPanelId = tab.getAttribute('data-tab-panel');
            
            simTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            simPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(targetPanelId).classList.add('active');
        });
    });

    // Toggle Add Context 選單顯示
    simContextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (simDropdownMenu.style.display === 'flex') {
            simDropdownMenu.style.display = 'none';
        } else {
            simDropdownMenu.style.display = 'flex';
        }
    });

    // 點擊空白處關閉選單
    document.addEventListener('click', () => {
        simDropdownMenu.style.display = 'none';
    });

    // 模擬選單項目點擊
    window.triggerSimDropdownAction = function(type) {
        addSimChatMessage('user', `<i class="fa-solid fa-plus-circle"></i> [Added Context: ${type}]`, false);
        simDropdownMenu.style.display = 'none';
    };

    // scenarioSelect 變更事件
    simScenarioSelect.addEventListener('change', () => {
        simCurrentScenarioKey = simScenarioSelect.value;
        simGoalTextContainer.innerText = SCENARIOS[simCurrentScenarioKey].goalText;
        simProjectNameLabel.innerText = SCENARIOS[simCurrentScenarioKey].projectName;
        resetSimulator();
    });

    // 啟動模擬按鈕
    simStartBtn.addEventListener('click', () => {
        startSimulation();
    });

    // 重設模擬按鈕
    simResetBtn.addEventListener('click', () => {
        resetSimulator();
    });

    // 批准計畫按鈕
    simApproveBtn.addEventListener('click', () => {
        if (simIsWaitingForApproval) {
            approvePlan();
        }
    });

    // 重置模擬器狀態
    function resetSimulator() {
        clearTimeout(simTimer);
        simIsWaitingForApproval = false;
        
        // 按鈕與輸入框重置
        simStartBtn.disabled = false;
        simResetBtn.disabled = true;
        simInputPlaceholder.innerText = '輸入您的 Prompt 或使用 Add Context...';
        simInputPlaceholder.style.color = 'var(--text-muted)';
        
        // 系統指示器
        simAppPulse.className = 'app-pulse-dot';
        simActuatorText.innerText = 'Offline';
        simActuatorText.style.color = 'var(--text-muted)';
        
        // 狀態標籤
        simStatusVal.className = 'sim-status-value idle';
        simStatusVal.innerText = '準備就緒，等待啟動...';
        
        // 頁籤重設 (除了計畫，其他都 disabled)
        simTabs.forEach((tab, index) => {
            if (index === 0) {
                tab.classList.add('active');
                tab.classList.remove('disabled');
            } else {
                tab.classList.remove('active');
                tab.classList.add('disabled');
            }
        });
        
        // Panel 顯示重設
        simPanelPlan.classList.add('active');
        simPanelDiff.classList.remove('active');
        simPanelProof.classList.remove('active');
        
        // 對話與產物內容清空
        simChatBox.innerHTML = `
            <div class="sim-chat-message bot">
                <div class="msg-sender"><i class="fa-solid fa-robot"></i> Antigravity Agent</div>
                <div class="msg-text">您好！我是 Antigravity。已成功載入專案資料夾。請點擊左側「啟動 Agent 模擬」開始演示。</div>
            </div>
        `;
        
        simPlanMdBox.innerHTML = `<div class="art-placeholder-text">Agent 啟動後，實作計畫書將會在此動態呈現。</div>`;
        simPlanBadge.innerText = '尚未生成';
        simPlanBadge.style.backgroundColor = 'rgba(255,255,255,0.03)';
        simPlanBadge.style.color = 'var(--text-muted)';
        simPlanBadge.style.borderColor = 'var(--border-color)';
        
        simApproveGate.style.display = 'none';
        simDiffBox.innerHTML = '';
        simBrowserViewport.innerHTML = '';
        simBrowserUrlText.innerText = 'http://localhost:3000';
        simBrowserStatusBadge.innerText = 'Offline';

        // 左側檔案樹 active 移除
        document.querySelectorAll('.sim-proj-file').forEach(f => f.classList.remove('active'));
    }

    // 新增聊天訊息的輔助函式
    function addSimChatMessage(sender, text, hasHeader = true) {
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
        
        simChatBox.appendChild(bubble);
        simChatBox.scrollTop = simChatBox.scrollHeight;
    }

    // 啟動模擬狀態機
    function startSimulation() {
        resetSimulator();
        
        simStartBtn.disabled = true;
        simResetBtn.disabled = false;
        
        // 變更執行狀態為 Running
        simStatusVal.className = 'sim-status-value running';
        simStatusVal.innerText = '正在執行 (Running)';
        simAppPulse.className = 'app-pulse-dot active';
        simActuatorText.innerText = 'Actuator Active';
        simActuatorText.style.color = 'var(--accent-emerald)';

        // 1. 使用者送出對話
        addSimChatMessage('user', SCENARIOS[simCurrentScenarioKey].goalText);
        simInputPlaceholder.innerText = 'Agent 正在工作中，請稍候...';
        simInputPlaceholder.style.color = 'var(--text-muted)';

        // 2. 步驟 1：初始化研究 (Research Phase)
        simTimer = setTimeout(() => {
            addSimChatMessage('bot', `<i class="fa-solid fa-circle-notch fa-spin"></i> 正在掃描本機專案目錄 <code>c:\\AIagent_Antigravity</code> 並探查環境依賴...`);
            
            // 左側專案檔案高亮，模擬 Agent 正在檢查這些檔案
            document.querySelectorAll('.sim-proj-file').forEach(f => f.classList.add('active'));

            simTimer = setTimeout(() => {
                addSimChatMessage('bot', `🔍 啟動背景子 Agent 執行相關知識搜尋，已分析完成。正在為您編寫實作計畫書...`);
                
                // 3. 步驟 2：計畫階段 (Planning Phase)
                simTimer = setTimeout(() => {
                    addSimChatMessage('bot', `✨ 實作計畫已生成！請在右側面板審查 <code>implementation_plan.md</code>。<strong>Agent 已暫停，等待您的核准。</strong>`);
                    
                    // 渲染 Plan MD
                    const planHtml = parseSimpleMarkdown(SCENARIOS[simCurrentScenarioKey].planMD);
                    simPlanMdBox.innerHTML = planHtml;
                    
                    // 更新計畫狀態 Badge
                    simPlanBadge.innerText = '等待核准';
                    simPlanBadge.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
                    simPlanBadge.style.color = 'var(--accent-amber)';
                    simPlanBadge.style.borderColor = 'rgba(245, 158, 11, 0.3)';

                    // 顯示核准審查閘門 (Approve Gate)
                    simApproveGate.style.display = 'flex';
                    
                    // 確保 Plan 頁籤是打開並 Active
                    focusArtifactTab('art-tab-plan');
                    
                    // 進入等待批准狀態
                    simStatusVal.className = 'sim-status-value waiting';
                    simStatusVal.innerText = '等待審查 (Waiting)';
                    simAppPulse.className = 'app-pulse-dot waiting';
                    simActuatorText.innerText = 'Suspended (Approval Gate)';
                    simActuatorText.style.color = 'var(--accent-amber)';
                    simIsWaitingForApproval = true;
                    
                }, 2000);
            }, 1800);
        }, 1200);
    }

    // 批准計畫
    function approvePlan() {
        simIsWaitingForApproval = false;
        
        // 恢復運行狀態
        simStatusVal.className = 'sim-status-value running';
        simStatusVal.innerText = '正在執行 (Running)';
        simAppPulse.className = 'app-pulse-dot active';
        simActuatorText.innerText = 'Actuator Active';
        simActuatorText.style.color = 'var(--accent-emerald)';
        
        // 隱藏 Approve Gate，將 Plan Badge 改為「已核准」
        simApproveGate.style.display = 'none';
        simPlanBadge.innerText = '已核准';
        simPlanBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        simPlanBadge.style.color = 'var(--accent-emerald)';
        simPlanBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        
        addSimChatMessage('user', '我已審查並批准此實作計畫，請開始執行。');
        
        // 4. 步驟 3：代碼寫入階段 (Execution - Code writing)
        simTimer = setTimeout(() => {
            addSimChatMessage('bot', `⚙️ 開始進行程式碼寫入。正在右側產生任務追蹤清單 <code>task.md</code>...`);
            
            simTimer = setTimeout(() => {
                // 寫入 Diff Code 到對比 panel，並開啟頁籤
                simDiffBox.innerHTML = SCENARIOS[simCurrentScenarioKey].diffCode;
                simTabDiff.classList.remove('disabled');
                focusArtifactTab('art-tab-diff'); // 切換到 Diff 讓使用者看
                
                addSimChatMessage('bot', `📝 正在對程式碼進行精確的區塊替換 (replace_file_content)...`);
                
                simTimer = setTimeout(() => {
                    addSimChatMessage('bot', `✅ 程式碼替換已完成。準備啟動自動化 Chrome 瀏覽器以驗證視覺排版與 E2E 流程...`);
                    
                    // 5. 步驟 4：自動化驗證階段 (Verification)
                    simTimer = setTimeout(() => {
                        simTabProof.classList.remove('disabled');
                        focusArtifactTab('art-tab-proof'); // 切換到 Browser 頁籤
                        
                        simBrowserUrlText.innerText = SCENARIOS[simCurrentScenarioKey].browserURL;
                        simBrowserStatusBadge.innerText = 'Loading...';
                        simBrowserViewport.innerHTML = '<div style="color: var(--text-secondary); font-family: var(--font-mono);"><i class="fa-solid fa-circle-notch fa-spin"></i> 正在叫起 Chrome 並渲染頁面...</div>';
                        
                        simTimer = setTimeout(() => {
                            // 載入完成，顯示模擬 app 介面
                            simBrowserStatusBadge.innerText = '200 OK';
                            simBrowserViewport.innerHTML = SCENARIOS[simCurrentScenarioKey].browserViewportHTML;
                            
                            if (simCurrentScenarioKey === 'calculator') {
                                setTimeout(() => {
                                    const tr = document.getElementById('sim-test-result');
                                    if (tr) tr.innerText = 'PASS';
                                }, 1000);
                            }
                            
                            addSimChatMessage('bot', `🌐 瀏覽器渲染完成。正在模擬滑鼠點擊、調整多種尺寸進行 RWD 檢測...`);
                            
                            simTimer = setTimeout(() => {
                                addSimChatMessage('bot', `📸 測試全部通過！已自動截圖，並在右側產生交付說明書 <code>walkthrough.md</code>。`);
                                
                                // 6. 步驟 5：完成階段 (Success Phase)
                                simStatusVal.className = 'sim-status-value success';
                                simStatusVal.innerText = '任務成功 (Success)';
                                simAppPulse.className = 'app-pulse-dot';
                                simActuatorText.innerText = 'Completed';
                                simActuatorText.style.color = 'var(--accent-emerald)';
                                
                                simInputPlaceholder.innerText = '任務已完成！可點選重設模擬器。';
                                addSimChatMessage('bot', `🎉 所有工作已成功自主完成！共計修改 3 個檔案，耗時約 15 秒。歡迎隨時體驗其他模擬場景。`);
                                
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
            simTabs.forEach(t => t.classList.remove('active'));
            matchedTab.classList.add('active');
            
            const targetPanelId = matchedTab.getAttribute('data-tab-panel');
            simPanels.forEach(panel => {
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
