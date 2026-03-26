# 🌌 ORION Trading Watchlist

A fast, minimal, and powerful TradingView side panel watchlist.

Built after a lot of testing, breaking, and fixing, this is the **most stable version so far**.
We removed unreliable logic and kept only what actually works.

---

## Why building this?👾

Well, TradingView’s free version has some limits.
ORION exists to get around those without making things complicated.

With ORION, you get:

* Unlimited watchlists and folders
* Instant chart access (and broker integration)
* Full control over how everything looks
* Everything running locally in your browser

No subscriptions. No unnecessary complexity.
Just a simple, clean, and powerful watchlist that helps you save unlimited charts, without paying any money to TradingView
It saves your valuable trades and analysis from being lost.

---

## 🌐 Browser Compatibility (Important)

Built for **Chromium-based browsers**.

✔ Works on:

* Google Chrome
* Brave
* Microsoft Edge
* Any Chromium-based browser

❌ Not supported:

* Firefox (different extension system)

(Because i was using it on my google chrome, and tested there)

---

## ⚡ Key Features

### 📊 Symbol Capture (Using The Most Stable Method know to Us)

* One-click capture directly from TradingView
* Uses ONLY `document.title` (most reliable source)
* No URL parsing
* No DOM scraping

Auto-formats symbols like:

```
NSE:SBIN
NSE:NIFTY50
```

---

### 📁 Folders, Tags & Notes

* Create unlimited folders
* Collapse / expand folders
* Drag, drop, and reorder symbols
* Pin important stocks to the top

Add context to your trades:

* Tags (e.g. breakout, swing)
* Notes for each symbol

Search and filter by:

* Symbol
* Tags
* Notes

---

### 🎨 Full UI Customization

You can control how everything looks, and it all saves locally:

* Accent color
* Title color
* Button colors
* Input field colors
* Background color
* Font size

---

### 🖼 Background System

* Upload your own wallpaper
* Adjust how it fits (cover / contain / stretch)
* Change position
* Remove anytime

---

### 🏦 Broker Integration

Add your own broker links to open charts directly.

#### ✔ Zerodha (Kite)

Works perfectly.

Example:

```
https://kite.zerodha.com/chart/ext/ciq/NSE/{symbol}/1D
```

👉 Clicking **Broker** opens the same chart in Kite

---

#### ⚠️ Groww Users

Groww does NOT support direct chart linking.

If you use:

```
https://groww.in/
```

👉 It will open the homepage
👉 You’ll need to search the stock manually

(Don't Worry, if there will be a solution then will make sure to fix this)
---

## ⚙️ Under the Hood

### How Symbol Capture Works

This version uses a single, reliable method:

```
document.title
```

Example:

```
Nifty 50 • 1D • NSE — TradingView
```

Converted to:

```
NSE:NIFTY50
```

Simple. Predictable. Reliable.

---

## 🔧 Changing the Default Exchange (  As Per Your Need )

By default, everything uses:

```
NSE
```

If you trade on a different exchange (like BSE, MCX, etc):

1. Open `sidepanel.js` - Right click on this, Open With -> Notepad/Notepad++/VS Code/Any Text Editor
2. Find this line: (without any changes in the code, this code is at line 306)

```js
exchange = matched || 'NSE';
```

3. Replace `'NSE'` with your exchange:

```js
exchange = matched || 'BSE';
```

---

## 💾 Privacy & Storage

* Uses `chrome.storage.local`
* No external servers
* No tracking
* Everything stays on your machine

---

## 🧪 Why This Version is Stable

Earlier versions tried to do too much and ended up breaking.
Let me explain why:

❌ DOM-based capture → breaks when TradingView updates
❌ URL-based capture → unreliable (doesn’t always update)
❌ Multiple fallbacks → inconsistent results

This version:

✅ Uses only one method
✅ No fallbacks
✅ No guessing
(While it lets you change the capture symbol/let's you override it, earlier version didn't had this feature)

So, It just works.

---

## 🔮 Future Updates

### Smart Sync (Without Cloud Mess)

The goal:

* Sync across devices
* No Google Cloud setup
* No heavy backend
* No privacy compromise

Possible approach:

* Export / Import system
* Lightweight local sync

---

## 📦 Installation( Read install.txt file for more details especially if you haven't installed any extension before, or is confused)

1. Download or clone this repository
2. Open your Chromium browser
3. Go to: chrome://extensions/
4. Enable **Developer Mode**
5. Click **Load unpacked**
6. Select the ORION folder

👉 ORION will now appear in your browser

---

## 🧭 Final Note

ORION is built to be:

* Fast
* Stable
* Simple
* Useful

This is not a feature-heavy experiment.

It’s a tool shaped by trial and error.

If something is here → it works
If something is missing → it was removed on purpose

(I'm not a professional developer, just a guy who wanted a simple watchlist for himself, and ended up making this, so if you're a developer, feel free to improve it.)
( Btw, i made the icons on my own, and if you want your own icon, just simply open the icons folder, and replace the png files with yours, with correct resolution.)
Enjoy Trading🚀
---

**Use it. Improve it. Make it yours.**
