# Clear Next.js cache
Write-Host "Clearing Next.js cache..."

# Stop any running Next.js processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for processes to stop
Start-Sleep -Seconds 2

# Remove .next directory
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    Write-Host ".next directory cleared"
}

# Remove node_modules cache
if (Test-Path node_modules\.cache) {
    Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
    Write-Host "node_modules cache cleared"
}

Write-Host "Cache cleared! You can now restart the dev server with: npm run dev"

