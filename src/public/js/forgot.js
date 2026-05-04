async function resetPassword() {
    const email = document.getElementById('email').value;
    const novaSenha = document.getElementById('novaSenha').value;

    if (!email || !novaSenha) {
        alert('Preencha os campos');
        return;
    }

    const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, novaSenha })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.msg);
        return;
    }

    alert('Senha alterada com sucesso');
    window.location.href = '/login';
}