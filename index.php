<?php
/**
 * SMAN 1 RANTAU KOPAR - Web Portal
 * XAMPP PHP Entrypoint
 */

// Disable browser caching during local development
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: 0");

// Load and render main index.html
if (file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
} else {
    echo "<h1>SMAN 1 RANTAU KOPAR</h1><p>Website file index.html tidak ditemukan.</p>";
}
