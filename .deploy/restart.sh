
#!/bin/bash

echo "[deploy] Restarting..."
pm2 restart blog-front
echo "[deploy] Restart done."
