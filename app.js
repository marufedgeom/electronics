// ===== APP STATE =====
const state = {
    currentPage: 'dashboard',
    currentLang: 'en',
    cart: [],
    scanner: null,
    theme: localStorage.getItem('theme') || 'light'
};

// ===== LANGUAGE DICTIONARY =====
const LANG = {
    en: {
        dashboard: 'Dashboard',
        pos: 'POS & Scanner',
        inventory: 'Inventory',
        accounts: 'Accounts & P&L',
        expenses: 'Expenses',
        services: 'Services & Bills',
        reports: 'Reports & Print',
        recycle: 'Recycle Bin',
        backup: 'Backup & Restore',
        settings: 'Settings',
        totalSales: 'Total Sales',
        orders: 'Orders',
        products: 'Products',
        netProfit: 'Net Profit',
        noTransactions: 'No transactions yet',
        openPOS: 'Open POS & Scanner',
        manageInventory: 'Manage Inventory',
        generateReports: 'Generate Reports',
        backupSystem: 'Backup System'
    },
    bn: {
        dashboard: 'ড্যাশবোর্ড',
        pos: 'পিওএস ও স্ক্যানার',
        inventory: 'ইনভেন্টরি',
        accounts: 'অ্যাকাউন্টস ও পিএন্ডএল',
        expenses: 'খরচ',
        services: 'সেবা ও বিল',
        reports: 'রিপোর্ট ও প্রিন্ট',
        recycle: 'রিসাইকেল বিন',
        backup: 'ব্যাকআপ ও রিস্টোর',
        settings: 'সেটিংস',
        totalSales: 'মোট বিক্রয়',
        orders: 'অর্ডার',
        products: 'পণ্য',
        netProfit: 'নিট লাভ',
        noTransactions: 'কোনো লেনদেন নেই',
        openPOS: 'পিওএস ও স্ক্যানার খুলুন',
        manageInventory: 'ইনভেন্টরি পরিচালনা',
        generateReports: 'রিপোর্ট তৈরি করুন',
        backupSystem: 'ব্যাকআপ সিস্টেম'
    },
    ar: {
        dashboard: 'لوحة القيادة',
        pos: 'نقطة البيع والماسح',
        inventory: 'المخزون',
        accounts: 'الحسابات والأرباح والخسائر',
        expenses: 'المصروفات',
        services: 'الخدمات والفواتير',
        reports: 'التقارير والطباعة',
        recycle: 'سلة المحذوفات',
        backup: 'النسخ الاحتياطي والاستعادة',
        settings: 'الإعدادات',
        totalSales: 'إجمالي المبيعات',
        orders: 'الطلبات',
        products: 'المنتجات',
        netProfit: 'صافي الربح',
        noTransactions: 'لا توجد معاملات',
        openPOS: 'فتح نقطة البيع والماسح',
        manageInventory: 'إدارة المخزون',
        generateReports: 'إنشاء التقارير',
        backupSystem: 'نظام النسخ الاحتياطي'
    }
};

// ===== TOAST =====
let toastTimeout = null;
function showToast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast ' + type;
    clearTimeout(toastTimeout);
    void el.offsetWidth;
    el.classList.add('show');
    toastTimeout = setTimeout(() => el.classList.remove('show'), 3000);
}

// ===== NAVIGATION =====
function navigateTo(page) {
    state.currentPage = page;
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.remove('hidden');
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.sidebar a[data-page="${page}"]`);
    if (link) link.classList.add('active');
    if (page === 'dashboard') renderDashboard();
    else if (page === 'pos') renderPOS();
    else if (page === 'inventory') renderInventory();
    else if (page === 'accounts') renderAccounts();
    else if (page === 'expenses') renderExpenses();
    else if (page === 'services') renderServices();
    else if (page === 'reports') renderReports();
    else if (page === 'recycle') renderRecycle();
    else if (page === 'backup') renderBackup();
    else if (page === 'settings') renderSettings();
}

// ===== LANGUAGE SWITCH =====
function setLanguage(lang) {
    state.currentLang = lang;
    document.querySelectorAll('.lang-switch button').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang)
    );
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    const t = LANG[lang];
    const pages = ['dashboard','pos','inventory','accounts','expenses','services','reports','recycle','backup','settings'];
    document.querySelectorAll('.sidebar a').forEach((link, idx) => {
        if (idx < pages.length) {
            const icon = link.querySelector('.icon')?.innerHTML || '';
            link.innerHTML = `${icon} ${t[pages[idx]] || pages[idx]}`;
        }
    });
    // Update stat labels
    const labels = document.querySelectorAll('.stat-card .lbl');
    if (labels.length >= 4) {
        labels[0].textContent = t.totalSales;
        labels[1].textContent = t.orders;
        labels[2].textContent = t.products;
        labels[3].textContent = t.netProfit;
    }
    showToast('Language: ' + lang.toUpperCase(), 'success');
}

// ===== RENDER DASHBOARD =====
function renderDashboard() {
    document.getElementById('dashboardDate').textContent = new Date().toLocaleString();
    document.getElementById('statTotalSales').textContent = '4,850.000 OMR';
    document.getElementById('statOrders').textContent = '42';
    document.getElementById('statProducts').textContent = '156';
    document.getElementById('statProfit').textContent = '1,230.500 OMR';
    document.getElementById('recentTx').innerHTML = `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-light);">
            <div><strong>#INV-2025-001</strong><br><span class="text-muted" style="font-size:0.8rem;">10 min ago</span></div>
            <div>45.000 OMR</div>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-light);">
            <div><strong>#INV-2025-002</strong><br><span class="text-muted" style="font-size:0.8rem;">35 min ago</span></div>
            <div>120.000 OMR</div>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
            <div><strong>#INV-2025-003</strong><br><span class="text-muted" style="font-size:0.8rem;">2 hours ago</span></div>
            <div>78.500 OMR</div>
        </div>
    `;
}

// ===== RENDER INVENTORY =====
function renderInventory() {
    document.getElementById('inventoryTableBody').innerHTML = `
        <tr><td>356789012345678</td><td>Samsung</td><td>Galaxy S24</td><td>8+256GB</td><td>320.000</td><td>450.000</td><td>12</td>
            <td><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td></tr>
        <tr><td>123456789012345</td><td>Apple</td><td>iPhone 16</td><td>6+128GB</td><td>420.000</td><td>580.000</td><td>8</td>
            <td><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td></tr>
        <tr><td>ACC-2025-001</td><td>Anker</td><td>Power Bank 20K</td><td>20000mAh</td><td>18.500</td><td>25.000</td><td>30</td>
            <td><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td></tr>
    `;
}

// ===== POS =====
let posCart = [];
function renderPOS() {
    document.getElementById('posStoreName').textContent = 'ROBIUL ELECTRONICS';
    document.getElementById('posProductList').innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:8px 0;">
            <div style="background:var(--bg-body);padding:12px;border-radius:var(--radius-sm);border:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;">
                <div><strong>Samsung Galaxy S24</strong><br><span class="text-muted" style="font-size:0.75rem;">450.000 OMR</span></div>
                <button class="btn btn-accent btn-sm" onclick="posAddToCart('Samsung Galaxy S24', 450)"><i class="fas fa-plus"></i></button>
            </div>
            <div style="background:var(--bg-body);padding:12px;border-radius:var(--radius-sm);border:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;">
                <div><strong>iPhone 16</strong><br><span class="text-muted" style="font-size:0.75rem;">580.000 OMR</span></div>
                <button class="btn btn-accent btn-sm" onclick="posAddToCart('iPhone 16', 580)"><i class="fas fa-plus"></i></button>
            </div>
            <div style="background:var(--bg-body);padding:12px;border-radius:var(--radius-sm);border:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;">
                <div><strong>Power Bank 20K</strong><br><span class="text-muted" style="font-size:0.75rem;">25.000 OMR</span></div>
                <button class="btn btn-accent btn-sm" onclick="posAddToCart('Power Bank 20K', 25)"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    `;
    renderPosCart();
    initScanner();
}

function posAddToCart(name, price) {
    const existing = posCart.find(i => i.name === name);
    if (existing) existing.qty += 1;
    else posCart.push({ name, price, qty: 1 });
    renderPosCart();
    showToast('Added: ' + name, 'success');
}

function renderPosCart() {
    const container = document.getElementById('posCartItems');
    const count = posCart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('posCartCount').textContent = count + ' items';
    if (posCart.length === 0) {
        container.innerHTML = '<div class="empty-state">🛒 Cart is empty</div>';
        document.getElementById('posSubtotal').textContent = '0.000 OMR';
        document.getElementById('posVat').textContent = '0.000 OMR';
        document.getElementById('posTotal').textContent = '0.000 OMR';
        return;
    }
    let subtotal = 0;
    let html = '';
    posCart.forEach((item, idx) => {
        const line = item.price * item.qty;
        subtotal += line;
        html += `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-light);">
                <div><strong>${item.name}</strong><br><span class="text-muted" style="font-size:0.75rem;">${item.price.toFixed(3)} OMR × ${item.qty}</span></div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-weight:700;">${line.toFixed(3)} OMR</span>
                    <button class="btn btn-danger btn-sm" onclick="posRemoveItem(${idx})"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    const vat = subtotal * 0.05;
    const total = subtotal + vat;
    document.getElementById('posSubtotal').textContent = subtotal.toFixed(3) + ' OMR';
    document.getElementById('posVat').textContent = vat.toFixed(3) + ' OMR';
    document.getElementById('posTotal').textContent = total.toFixed(3) + ' OMR';
}

function posRemoveItem(idx) { posCart.splice(idx, 1); renderPosCart(); }

document.getElementById('posClearCartBtn').addEventListener('click', () => {
    posCart = []; renderPosCart(); showToast('Cart cleared', '');
});

document.getElementById('posCheckoutBtn').addEventListener('click', () => {
    if (posCart.length === 0) { showToast('Cart is empty!', 'error'); return; }
    const total = posCart.reduce((s, i) => s + i.price * i.qty, 0) * 1.05;
    showToast('Checkout complete! Total: ' + total.toFixed(3) + ' OMR', 'success');
    posCart = []; renderPosCart();
});

// ===== SCANNER =====
let html5QrCode = null;
function initScanner() {
    const container = document.getElementById('scanner-container');
    if (!container) return;
    try {
        if (html5QrCode) html5QrCode.clear();
        html5QrCode = new Html5Qrcode('scanner-container');
        html5QrCode.start({ facingMode: 'environment' }, { fps: 15, qrbox: { width: 240, height: 140 } },
            (decodedText) => {
                posAddToCart(decodedText.trim(), 99.999);
                document.getElementById('posScannerStatus').textContent = '✅ Scanned: ' + decodedText;
                setTimeout(() => {
                    document.getElementById('posScannerStatus').textContent = '📷 Camera ready — point at barcode';
                }, 1200);
            },
            (err) => {}
        ).then(() => {
            document.getElementById('posScannerStatus').textContent = '✅ Camera active — scanning';
            document.getElementById('posScannerDot').className = 'dot active';
        }).catch(() => {
            document.getElementById('posScannerStatus').textContent = '⚠️ Camera unavailable — manual only';
            document.getElementById('posScannerDot').className = 'dot';
        });
    } catch (e) {
        document.getElementById('posScannerStatus').textContent = '⚠️ Scanner library not loaded';
        document.getElementById('posScannerDot').className = 'dot';
    }
}

// ===== ACCOUNTS, EXPENSES, SERVICES, REPORTS, RECYCLE, BACKUP, SETTINGS (simplified) =====
function renderAccounts() {
    document.getElementById('accTotalRevenue').textContent = '4,850.000 OMR';
    document.getElementById('accTotalCost').textContent = '3,150.000 OMR';
    document.getElementById('accNetProfit').textContent = '1,700.000 OMR';
    document.getElementById('accountsTableBody').innerHTML = `
        <tr><td>2025-03-22 10:30</td><td>3</td><td>450.000 OMR</td><td>320.000 OMR</td><td>130.000 OMR</td><td>admin</td></tr>
        <tr><td>2025-03-22 11:15</td><td>2</td><td>580.000 OMR</td><td>420.000 OMR</td><td>160.000 OMR</td><td>admin</td></tr>
    `;
}
function renderExpenses() {
    document.getElementById('expensesTableBody').innerHTML = `
        <tr><td>2025-03-22</td><td>Utilities</td><td>Electricity bill</td><td>45.000 OMR</td><td><span class="badge-status active">Paid</span></td>
            <td><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td></tr>
    `;
}
function renderServices() {
    document.getElementById('servicesTableBody').innerHTML = `
        <tr><td>Internet Subscription</td><td>Ahmed Ali</td><td>15.000 OMR</td><td><span class="badge-status active">Active</span></td><td>1.500 OMR</td>
            <td><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td></tr>
    `;
}
function renderReports() {}
function renderRecycle() {
    document.getElementById('recycleCount').textContent = '2 items';
    document.getElementById('recycleTableBody').innerHTML = `
        <tr><td>Product</td><td>iPhone 15</td><td>2025-03-20</td>
            <td><button class="btn btn-success btn-sm"><i class="fas fa-undo"></i> Restore</button> <button class="btn btn-danger btn-sm"><i class="fas fa-fire"></i> Purge</button></td></tr>
    `;
}
function renderBackup() {}
function renderSettings() {}

// ===== INIT =====
function init() {
    // Build app layout
    const root = document.getElementById('app-root');
    root.innerHTML = `
        <div class="app-wrapper">
            <aside class="sidebar" id="sidebar">
                <div class="user-card">
                    <div class="name"><i class="fas fa-user-circle"></i> Admin Owner</div>
                    <div class="role"><i class="fas fa-crown"></i> Super Admin</div>
                </div>
                <a href="#" class="active" data-page="dashboard"><span class="icon"><i class="fas fa-chart-pie"></i></span> Dashboard <span class="badge-notif">Live</span></a>
                <a href="#" data-page="pos"><span class="icon"><i class="fas fa-cash-register"></i></span> POS & Scanner</a>
                <a href="#" data-page="inventory"><span class="icon"><i class="fas fa-boxes"></i></span> Inventory</a>
                <a href="#" data-page="accounts"><span class="icon"><i class="fas fa-coins"></i></span> Accounts & P&L</a>
                <a href="#" data-page="expenses"><span class="icon"><i class="fas fa-file-invoice-dollar"></i></span> Expenses</a>
                <a href="#" data-page="services"><span class="icon"><i class="fas fa-wifi"></i></span> Services & Bills</a>
                <a href="#" data-page="reports"><span class="icon"><i class="fas fa-file-alt"></i></span> Reports & Print</a>
                <a href="#" data-page="recycle"><span class="icon"><i class="fas fa-trash-alt"></i></span> Recycle Bin</a>
                <a href="#" data-page="backup"><span class="icon"><i class="fas fa-database"></i></span> Backup & Restore</a>
                <a href="#" data-page="settings"><span class="icon"><i class="fas fa-cogs"></i></span> Settings</a>
            </aside>
            <main class="main-content" id="mainContent">
                <section id="page-dashboard" class="page-section">
                    <div class="flex-between mb-2">
                        <h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-chart-pie" style="color:var(--accent);"></i> Dashboard</h2>
                        <span style="color:var(--text-muted);font-size:0.9rem;" id="dashboardDate"></span>
                    </div>
                    <div class="grid-4" id="dashboardStats">
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-shopping-cart"></i></div><div class="num" id="statTotalSales">0.000 OMR</div><div class="lbl">Total Sales</div></div>
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-chart-line"></i></div><div class="num" id="statOrders">0</div><div class="lbl">Orders</div></div>
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-box"></i></div><div class="num" id="statProducts">0</div><div class="lbl">Products</div></div>
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-coins"></i></div><div class="num" id="statProfit">0.000 OMR</div><div class="lbl">Net Profit</div></div>
                    </div>
                    <div class="grid-2 mt-2">
                        <div class="card"><div class="card-title"><i class="icon fas fa-clock"></i> Recent Transactions</div><div id="recentTx" style="max-height:240px;overflow-y:auto;"><div class="empty-state">No transactions yet</div></div></div>
                        <div class="card"><div class="card-title"><i class="icon fas fa-bolt"></i> Quick Actions</div><div style="display:flex;flex-direction:column;gap:12px;">
                            <button class="btn btn-accent" onclick="navigateTo('pos')"><i class="fas fa-cash-register"></i> Open POS & Scanner</button>
                            <button class="btn btn-primary" onclick="navigateTo('inventory')"><i class="fas fa-boxes"></i> Manage Inventory</button>
                            <button class="btn btn-glass" onclick="navigateTo('reports')"><i class="fas fa-file-alt"></i> Generate Reports</button>
                            <button class="btn btn-outline" onclick="navigateTo('backup')"><i class="fas fa-database"></i> Backup System</button>
                        </div></div>
                    </div>
                </section>
                <section id="page-pos" class="page-section hidden">
                    <div class="flex-between mb-2">
                        <h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-cash-register" style="color:var(--accent);"></i> POS & Barcode Scanner</h2>
                        <span class="chip" id="posStoreName">ROBIUL ELECTRONICS</span>
                    </div>
                    <div class="grid-2">
                        <div class="card">
                            <div class="card-title"><i class="icon fas fa-qrcode"></i> Scanner <span style="font-weight:400;font-size:0.75rem;color:var(--text-muted);">(2027 Swift Scan)</span></div>
                            <div id="scanner-container"><div class="scanner-overlay"></div><div class="scanner-line"></div></div>
                            <div class="scanner-status"><span class="dot active" id="posScannerDot"></span><span id="posScannerStatus">📷 Camera ready — point at barcode</span></div>
                            <div class="form-row mt-2"><input type="text" class="form-control" id="posManualBarcode" placeholder="Type barcode or IMEI" /><button class="btn btn-accent" id="posManualAddBtn"><i class="fas fa-plus"></i> Add</button></div>
                            <div id="posProductList" style="max-height:240px;overflow-y:auto;margin-top:12px;"><div class="empty-state">Search or scan to add products</div></div>
                        </div>
                        <div class="card">
                            <div class="card-title"><i class="icon fas fa-shopping-cart"></i> Cart <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);" id="posCartCount">0 items</span></div>
                            <div id="posCartItems" style="max-height:200px;overflow-y:auto;"></div>
                            <div class="cart-summary" style="background:rgba(10,25,47,0.03);border-radius:var(--radius-sm);padding:16px 20px;margin-top:12px;border:1px solid var(--border-light);">
                                <div class="flex-between"><span>Subtotal</span><span id="posSubtotal">0.000 OMR</span></div>
                                <div class="flex-between"><span>VAT (5%)</span><span id="posVat">0.000 OMR</span></div>
                                <div class="flex-between" style="font-weight:700;font-size:1.2rem;border-top:2px solid var(--border-light);padding-top:10px;margin-top:8px;"><span>Total</span><span id="posTotal">0.000 OMR</span></div>
                            </div>
                            <div class="flex mt-2"><button class="btn btn-success" style="flex:1;" id="posCheckoutBtn"><i class="fas fa-check"></i> Checkout</button><button class="btn btn-outline" id="posClearCartBtn"><i class="fas fa-trash"></i> Clear</button></div>
                        </div>
                    </div>
                </section>
                <section id="page-inventory" class="page-section hidden">
                    <div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-boxes" style="color:var(--accent);"></i> Inventory</h2><button class="btn btn-accent" id="addProductBtn"><i class="fas fa-plus"></i> Add Product</button></div>
                    <div class="card"><div class="table-wrap"><table><thead><tr><th>IMEI / Barcode</th><th>Brand</th><th>Model</th><th>Variant</th><th>Cost (OMR)</th><th>Sale (OMR)</th><th>Stock</th><th>Actions</th></tr></thead><tbody id="inventoryTableBody"><tr><td colspan="8" class="text-center text-muted" style="padding:24px;">No products found</td></tr></tbody></table></div></div>
                </section>
                <section id="page-accounts" class="page-section hidden">
                    <div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-coins" style="color:var(--accent);"></i> Accounts & Profit/Loss</h2></div>
                    <div class="grid-3 mb-2">
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-dollar-sign"></i></div><div class="num" id="accTotalRevenue">0.000 OMR</div><div class="lbl">Revenue</div></div>
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-truck"></i></div><div class="num" id="accTotalCost">0.000 OMR</div><div class="lbl">Cost of Goods</div></div>
                        <div class="stat-card"><div class="icon-bg"><i class="fas fa-chart-pie"></i></div><div class="num" id="accNetProfit">0.000 OMR</div><div class="lbl">Net Profit</div></div>
                    </div>
                    <div class="card"><div class="card-title"><i class="icon fas fa-list"></i> Transaction Log</div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Items</th><th>Revenue</th><th>Cost</th><th>Profit</th><th>User</th></tr></thead><tbody id="accountsTableBody"><tr><td colspan="6" class="text-center text-muted" style="padding:24px;">No transactions recorded</td></tr></tbody></table></div></div>
                </section>
                <section id="page-expenses" class="page-section hidden">
                    <div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-file-invoice-dollar" style="color:var(--accent);"></i> Expenses</h2><button class="btn btn-accent" id="addExpenseBtn"><i class="fas fa-plus"></i> Add Expense</button></div>
                    <div class="card"><div class="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount (OMR)</th><th>Status</th><th>Actions</th></tr></thead><tbody id="expensesTableBody"><tr><td colspan="6" class="text-center text-muted" style="padding:24px;">No expenses recorded</td></tr></tbody></table></div></div>
                </section>
                <section id="page-services" class="page-section hidden">
                    <div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-wifi" style="color:var(--accent);"></i> Services & Telecom Bills</h2><button class="btn btn-accent" id="addServiceBtn"><i class="fas fa-plus"></i> New Service</button></div>
                    <div class="card"><div class="table-wrap"><table><thead><tr><th>Service Type</th><th>Customer</th><th>Amount (OMR)</th><th>Status</th><th>Commission</th><th>Actions</th></tr></thead><tbody id="servicesTableBody"><tr><td colspan="6" class="text-center text-muted" style="padding:24px;">No services found</td></tr></tbody></table></div></div>
                </section>
                <section id="page-reports" class="page-section hidden"><div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-file-alt" style="color:var(--accent);"></i> Reports & Print</h2></div><div class="grid-2"><div class="card"><div class="card-title"><i class="icon fas fa-chart-bar"></i> Sales Report</div><div class="form-row"><div class="form-group"><label>From</label><input type="date" class="form-control" /></div><div class="form-group"><label>To</label><input type="date" class="form-control" /></div></div><button class="btn btn-accent"><i class="fas fa-file-pdf"></i> Generate PDF</button><button class="btn btn-outline"><i class="fas fa-print"></i> Print</button></div><div class="card"><div class="card-title"><i class="icon fas fa-coins"></i> Profit & Loss Summary</div><div class="form-row"><div class="form-group"><label>Month</label><select class="form-control"><option>January</option><option>February</option></select></div><div class="form-group"><label>Year</label><select class="form-control"><option>2025</option><option>2026</option></select></div></div><button class="btn btn-accent"><i class="fas fa-file-pdf"></i> Generate</button><button class="btn btn-outline"><i class="fas fa-print"></i> Print</button></div></div></section>
                <section id="page-recycle" class="page-section hidden"><div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-trash-alt" style="color:var(--accent);"></i> Recycle Bin</h2><span class="chip" id="recycleCount">0 items</span></div><div class="card"><div class="table-wrap"><table><thead><tr><th>Original Type</th><th>Identifier</th><th>Deleted At</th><th>Actions</th></tr></thead><tbody id="recycleTableBody"><tr><td colspan="4" class="text-center text-muted" style="padding:24px;">Trash is empty</td></tr></tbody></table></div></div></section>
                <section id="page-backup" class="page-section hidden"><div class="flex-between mb-2"><h2 style="font-size:1.8rem;font-weight:800;"><i class="fas fa-database" style="color:var(--accent);"></i> Backup & Restore</h2></div><div class="grid-2"><div class="card"><div class="card-title"><i class="icon fas fa-download"></i> Generate Backup</div><p class="text-muted" style="margin-bottom:12px;">Create a compressed SQL dump of all system data.</p><button class="btn btn-primary" id="backupGenerateBtn"><i class="fas fa-file-archive"></i> Generate & Download</button></div><div class="card"><div class="card-title"><i class="icon fas fa-upload"></i> Restore from Backup</div><div class="form-group"><label>Select .sql file</label><input type="file" class="form-control" id="restoreFileInput" accept=".sql" /></div><button class="btn btn-danger" id="restoreExecuteBtn"><i class="fas fa-undo"></i> Restore Database</button></div></div></section>
                <section id="page-settings" class="page-section hidden">
                    <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:16px;"><i class="fas fa-cogs" style="color:var(--accent);"></i> Settings</h2>
                    <div class="grid-2">
                        <div class="card"><div class="card-title"><i class="icon fas fa-store"></i> Store Information</div><div class="form-group"><label>Shop Name</label><input type="text" class="form-control" id="setShopName" value="ROBIUL ELECTRONICS" /></div><div class="form-group"><label>Legal Entity</label><input type="text" class="form-control" id="setLegalName" value="AL WAHA AL KHDRA AL MUTAKAMILAH TRADING" /></div><div class="form-group"><label>CR Number</label><input type="text" class="form-control" id="setCR" value="1374092" /></div><div class="form-group"><label>Currency</label><input type="text" class="form-control" id="setCurrency" value="OMR" readonly /></div><button class="btn btn-success" id="setSaveStore"><i class="fas fa-save"></i> Save</button></div>
                        <div class="card"><div class="card-title"><i class="icon fas fa-cog"></i> Tax & System</div><div class="form-group"><label>VAT Rate (%)</label><input type="number" class="form-control" id="setTaxRate" value="5" step="0.5" /></div><div class="form-group"><label>Enable VAT</label><select class="form-control" id="setVatEnabled"><option value="1">Yes</option><option value="0">No</option></select></div><button class="btn btn-success" id="setSaveTax"><i class="fas fa-save"></i> Save Tax Settings</button><hr style="margin:16px 0;border-color:var(--border-light);" /><button class="btn btn-danger" id="setClearAllData"><i class="fas fa-trash"></i> Clear All Data</button></div>
                        <div class="card" style="grid-column:1/-1;"><div class="card-title"><i class="icon fas fa-code"></i> Developer & System Settings</div><div class="grid-2"><div><div class="form-group"><label>API Base URL</label><input type="text" class="form-control" id="devApiUrl" value="https://erp.yourcompany.com" /></div><div class="form-group"><label>API Key</label><input type="password" class="form-control" id="devApiKey" value="sk_test_xxxxxxxx" /></div><div class="form-group"><label>API Secret</label><input type="password" class="form-control" id="devApiSecret" value="sk_test_yyyyyyyy" /></div></div><div><div class="form-group"><label>Theme</label><select class="form-control" id="devThemeSelect"><option value="light">Light</option><option value="dark">Dark</option></select></div><div class="form-group"><label>Debug Mode</label><select class="form-control" id="devDebugMode"><option value="0">Off</option><option value="1">On</option></select></div><div class="form-group"><label>Cache TTL (seconds)</label><input type="number" class="form-control" id="devCacheTtl" value="3600" /></div></div></div><div class="flex mt-2"><button class="btn btn-accent" id="saveDevSettings"><i class="fas fa-save"></i> Save Developer Settings</button><button class="btn btn-danger" id="resetAppBtn"><i class="fas fa-trash"></i> Reset App Data</button></div></div>
                    </div>
                </section>
            </main>
        </div>
    `;

    // ===== EVENT BINDING =====
    document.querySelectorAll('.sidebar a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.addEventListener('click', function() {
            setLanguage(this.dataset.lang);
        });
    });

    document.getElementById('posManualAddBtn')?.addEventListener('click', function() {
        const input = document.getElementById('posManualBarcode');
        const val = input.value.trim();
        if (!val) { showToast('Enter a barcode', 'error'); return; }
        posAddToCart(val, 99.999);
        input.value = '';
    });

    document.getElementById('saveDevSettings')?.addEventListener('click', function() {
        const theme = document.getElementById('devThemeSelect').value;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        showToast('Developer settings saved! Theme: ' + theme, 'success');
    });

    document.getElementById('resetAppBtn')?.addEventListener('click', function() {
        if (confirm('⚠️ This will reset all application data. Are you sure?')) {
            localStorage.clear();
            sessionStorage.clear();
            showToast('App data reset. Reloading...', 'success');
            setTimeout(() => location.reload(), 1500);
        }
    });

    document.getElementById('backupGenerateBtn')?.addEventListener('click', function() {
        showToast('Backup generated: robiul_backup_2025-03-22.sql', 'success');
    });

    document.getElementById('restoreExecuteBtn')?.addEventListener('click', function() {
        const fileInput = document.getElementById('restoreFileInput');
        if (!fileInput?.files?.length) {
            showToast('Please select a .sql file', 'error');
            return;
        }
        showToast('Database restored from ' + fileInput.files[0].name, 'success');
    });

    // ===== IMAGE EDITOR =====
    const canvas = document.getElementById('imgEditorCanvas');
    const ctx = canvas.getContext('2d');
    let imgObject = new Image();
    let rotation = 0;
    imgObject.src = 'https://via.placeholder.com/400x300/0a192f/f5a623?text=Product+Image';
    imgObject.onload = function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotation * Math.PI/180);
        ctx.drawImage(imgObject, -imgObject.width/2, -imgObject.height/2, imgObject.width, imgObject.height);
        ctx.restore();
    };

    document.getElementById('rotateBtn')?.addEventListener('click', function() {
        rotation = (rotation + 90) % 360;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotation * Math.PI/180);
        ctx.drawImage(imgObject, -imgObject.width/2, -imgObject.height/2, imgObject.width, imgObject.height);
        ctx.restore();
    });

    document.getElementById('resetImgBtn')?.addEventListener('click', function() {
        rotation = 0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(0);
        ctx.drawImage(imgObject, -imgObject.width/2, -imgObject.height/2, imgObject.width, imgObject.height);
        ctx.restore();
        showToast('Image reset', 'success');
    });

    document.getElementById('saveImageBtn')?.addEventListener('click', function() {
        showToast('Image changes saved successfully!', 'success');
        document.getElementById('imageEditorModal').classList.remove('open');
    });

    document.getElementById('closeEditorBtn')?.addEventListener('click', function() {
        document.getElementById('imageEditorModal').classList.remove('open');
    });

    // ===== INIT DASHBOARD =====
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('devThemeSelect').value = savedTheme;

    setLanguage('en');
    navigateTo('dashboard');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}