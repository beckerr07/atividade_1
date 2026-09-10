import pool from './database/conexao.js';

try {
    const [equipamentos] = await pool.query(
        'SELECT * FROM equipamentos'
    );

    console.log('Conexão realizada com sucesso!');
    console.log(equipamentos);

} catch (erro) {
    console.error('Erro ao conectar ao banco:');
    console.error(erro);

} finally {
    await pool.end();
}