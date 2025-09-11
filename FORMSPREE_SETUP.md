# إعداد Formspree للعمل مع موقعك

## الخطوات المطلوبة:

### 1. تحديث رابط الموقع في النموذج

في ملف `index.html`، قم بتحديث هذا السطر:

```html
<input type="hidden" name="_next" value="https://your-website-url.com/index.html?success=true">
```

استبدل `https://your-website-url.com` برابط موقعك الفعلي، على سبيل المثال:

```html
<input type="hidden" name="_next" value="https://brotherhood-rp.netlify.app/index.html?success=true">
```

### 2. إعداد Formspree

1. اذهب إلى [Formspree.io](https://formspree.io)
2. سجل دخول إلى حسابك
3. اذهب إلى إعدادات النموذج
4. في قسم "Redirects" أو "After Submit"
5. أضف رابط موقعك: `https://your-website-url.com/index.html?success=true`

### 3. اختبار النموذج

بعد التحديث:
1. املأ النموذج
2. اضغط "إرسال"
3. يجب أن يعيدك إلى موقعك مع إشعار نجاح

## إذا كنت تستخدم GitHub Pages:

استبدل الرابط بـ:
```html
<input type="hidden" name="_next" value="https://username.github.io/repository-name/index.html?success=true">
```

## إذا كنت تستخدم Netlify:

استبدل الرابط بـ:
```html
<input type="hidden" name="_next" value="https://your-site-name.netlify.app/index.html?success=true">
```

## إذا كنت تستخدم استضافة أخرى:

استبدل الرابط برابط موقعك الفعلي.
