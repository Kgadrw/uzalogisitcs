# Fix Next.js dependencies and clear cache
Write-Host "Stopping Node processes..."
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Waiting for processes to stop..."
Start-Sleep -Seconds 3

Write-Host "Removing .next directory..."
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
}

Write-Host "Installing dependencies..."
npm install

Write-Host "Done! You can now run: npm run dev"

