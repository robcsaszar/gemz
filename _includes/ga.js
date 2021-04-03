window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', '{{ site.google_analytics_id }}', {
    'anonymize_ip': true,
    'forceSSL': true,
    'cookie_flags': 'SameSite=None;Secure'
});