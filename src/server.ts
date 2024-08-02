import app from "./app";

const PORT = process.env.PORT;
console.log(PORT)

if (PORT == '3000') {
  console.log('ah lula -> desenvolvimento');
} else {
  console.log('ah lula -> produção');
}

app.listen(PORT, () => {
  console.log(`New Pace is running on port ${PORT}`);
});
