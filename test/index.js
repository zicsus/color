/* eslint-env node, mocha */

import assert from 'node:assert';
import Color from '../index.js';

const {deepEqual} = assert;
const {equal} = assert;
const {ok} = assert;
const {notStrictEqual} = assert;
const {throws} = assert;

it('Color() instance', () => {
	equal(new Color('red').red(), 255);
	ok((new Color()) instanceof Color);
	const c = Color();
	notStrictEqual(c.rgb(), c.rgb());
});

it('Color() instance (null)', () => {
	ok((new Color(null)) instanceof Color);
});

it('Color() instance (undefined)', () => {
	ok((new Color(undefined)) instanceof Color);
});

it('Immutability', () => {
	const c = Color(0xFF0000);
	ok(c !== c.rgb());
	ok(c != c.rgb()); // eslint-disable-line eqeqeq
});

it('Colors to JSON', () => {
	deepEqual(Color('#0A1E19').rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('rgb(10, 30, 25)').rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('rgba(10, 30, 25, 0.4)').rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 0.4,
	});
	deepEqual(Color('rgb(4%, 12%, 10%)').rgb().toJSON(), {
		color: [10, 31, 26],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('rgba(4%, 12%, 10%, 0.4)').rgb().toJSON(), {
		color: [10, 31, 26],
		model: 'rgb',
		valpha: 0.4,
	});
	deepEqual(Color('blue').rgb().toJSON(), {
		color: [0, 0, 255],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('hsl(120, 50%, 60%)').hsl().toJSON(), {
		color: [120, 50, 60],
		model: 'hsl',
		valpha: 1,
	});
	deepEqual(Color('hsla(120, 50%, 60%, 0.4)').hsl().toJSON(), {
		color: [120, 50, 60],
		model: 'hsl',
		valpha: 0.4,
	});
	deepEqual(Color('hwb(120, 50%, 60%)').hwb().toJSON(), {
		color: [120, 50, 60],
		model: 'hwb',
		valpha: 1,
	});
	deepEqual(Color('hwb(120, 50%, 60%, 0.4)').hwb().toJSON(), {
		color: [120, 50, 60],
		model: 'hwb',
		valpha: 0.4,
	});

	deepEqual(Color({
		r: 10,
		g: 30,
		b: 25,
	}).rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		l: 25,
	}).hsl().toJSON(), {
		color: [10, 30, 25],
		model: 'hsl',
		valpha: 1,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		v: 25,
	}).hsv().toJSON(), {
		color: [10, 30, 25],
		model: 'hsv',
		valpha: 1,
	});
	deepEqual(Color({
		h: 10,
		w: 30,
		b: 25,
	}).hwb().toJSON(), {
		color: [10, 30, 25],
		model: 'hwb',
		valpha: 1,
	});
	deepEqual(Color({
		c: 10,
		m: 30,
		y: 25,
		k: 10,
	}).cmyk().toJSON(), {
		color: [10, 30, 25, 10],
		model: 'cmyk',
		valpha: 1,
	});
	deepEqual(Color({
		okl: 70,
		okc: 0.15,
		okh: 180,
	}).oklch().toJSON(), {
		color: [70, 0.15, 180],
		model: 'oklch',
		valpha: 1,
	});
	deepEqual(Color({
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	}).oklch().toJSON(), {
		color: [70, 0.15, 180],
		model: 'oklch',
		valpha: 0.8,
	});
});

it('Color() argument', () => {
	deepEqual(Color('#0A1E19').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color('rgb(10, 30, 25)').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color('rgba(10, 30, 25, 0.4)').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});
	deepEqual(Color('rgb(4%, 12%, 10%)').rgb().object(), {
		r: 10,
		g: 31,
		b: 26,
	});
	deepEqual(Color('rgba(4%, 12%, 10%, 0.4)').rgb().object(), {
		r: 10,
		g: 31,
		b: 26,
		alpha: 0.4,
	});
	deepEqual(Color('blue').rgb().object(), {
		r: 0,
		g: 0,
		b: 255,
	});
	deepEqual(Color('hsl(120, 50%, 60%)').hsl().object(), {
		h: 120,
		s: 50,
		l: 60,
	});
	deepEqual(Color('hsla(120, 50%, 60%, 0.4)').hsl().object(), {
		h: 120,
		s: 50,
		l: 60,
		alpha: 0.4,
	});
	deepEqual(Color('hwb(120, 50%, 60%)').hwb().object(), {
		h: 120,
		w: 50,
		b: 60,
	});
	deepEqual(Color('hwb(120, 50%, 60%, 0.4)').hwb().object(), {
		h: 120,
		w: 50,
		b: 60,
		alpha: 0.4,
	});

	deepEqual(Color({
		r: 10,
		g: 30,
		b: 25,
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		l: 25,
	}).hsl().object(), {
		h: 10,
		s: 30,
		l: 25,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		v: 25,
	}).hsv().object(), {
		h: 10,
		s: 30,
		v: 25,
	});
	deepEqual(Color({
		h: 10,
		w: 30,
		b: 25,
	}).hwb().object(), {
		h: 10,
		w: 30,
		b: 25,
	});
	deepEqual(Color({
		c: 10,
		m: 30,
		y: 25,
		k: 10,
	}).cmyk().object(), {
		c: 10,
		m: 30,
		y: 25,
		k: 10,
	});
	deepEqual(Color({
		okl: 70,
		okc: 0.15,
		okh: 180,
	}).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
	});
	deepEqual(Color({
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	}).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	});
});

it('Setters', () => {
	deepEqual(Color.rgb(10, 30, 25).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb(10, 30, 25, 0.4).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});
	deepEqual(Color.rgb([10, 30, 25]).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb([10, 30, 25, 0.4]).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});
	deepEqual(Color.rgb({
		r: 10,
		g: 30,
		b: 25,
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb({
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});

	deepEqual(Color.hsl([260, 10, 10]).hsl().object(), {
		h: 260,
		s: 10,
		l: 10,
	});
	deepEqual(Color.hsv([260, 10, 10]).hsv().object(), {
		h: 260,
		s: 10,
		v: 10,
	});
	deepEqual(Color.hwb([260, 10, 10]).hwb().object(), {
		h: 260,
		w: 10,
		b: 10,
	});
	deepEqual(Color.cmyk([10, 10, 10, 10]).cmyk().object(), {
		c: 10,
		m: 10,
		y: 10,
		k: 10,
	});
	deepEqual(Color.oklch([70, 0.15, 180]).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
	});
	deepEqual(Color.oklch([70, 0.15, 180, 0.8]).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	});
	deepEqual(Color.oklch(70, 0.15, 180).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
	});
	deepEqual(Color.oklch(70, 0.15, 180, 0.8).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	});
	deepEqual(Color.oklch({
		okl: 70,
		okc: 0.15,
		okh: 180,
	}).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
	});
	deepEqual(Color.oklch({
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	}).oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	});
});

it('Retain Alpha', () => {
	equal(Color.rgb(1, 2, 3, 0.4).ansi256().rgb().alpha(), 0.4);
});

it('Translations', () => {
	deepEqual(Color.rgb(10, 30, 25).rgb().round().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb(10, 30, 25).hsl().round().object(), {
		h: 165,
		s: 50,
		l: 8,
	});
	deepEqual(Color.rgb(10, 30, 25).hsv().round().object(), {
		h: 165,
		s: 67,
		v: 12,
	});
	deepEqual(Color.rgb(10, 30, 25).hwb().round().object(), {
		h: 165,
		w: 4,
		b: 88,
	});
	deepEqual(Color.rgb(10, 30, 25).cmyk().round().object(), {
		c: 67,
		m: 0,
		y: 17,
		k: 88,
	});
	deepEqual(Color.rgb(10, 30, 25).oklch().round().object(), {
		okl: 22,
		okc: 3,
		okh: 175,
	});
});

it('Array getters', () => {
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
	}).rgb().array(), [10, 20, 30]);
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
	}).unitArray(), [10 / 255, 20 / 255, 30 / 255]);
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.5,
	}).unitArray(), [10 / 255, 20 / 255, 30 / 255, 0.5]);
	deepEqual(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hsl().array(), [10, 20, 30]);
	deepEqual(Color({
		h: 10,
		s: 20,
		v: 30,
	}).hsv().array(), [10, 20, 30]);
	deepEqual(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hwb().array(), [10, 20, 30]);
	deepEqual(Color({
		c: 10,
		m: 20,
		y: 30,
		k: 40,
	}).cmyk().array(), [10, 20, 30, 40]);
	deepEqual(Color({
		okl: 70,
		okc: 0.15,
		okh: 180,
	}).oklch().array(), [70, 0.15, 180]);
	deepEqual(Color({
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	}).oklch().array(), [70, 0.15, 180, 0.8]);
});

it('Multiple times', () => {
	const color = Color({
		r: 10,
		g: 20,
		b: 30,
	});
	deepEqual(color.rgb().array(), [10, 20, 30]);
	deepEqual(color.rgb().array(), [10, 20, 30]);
});

it('Channel getters/setters', () => {
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.4,
	}).alpha(), 0.4);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.4,
	}).alpha(0.7).alpha(), 0.7);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).red(), 10);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).red(100).red(), 100);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).green(), 20);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).green(200).green(), 200);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).blue(), 30);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).blue(60).blue(), 60);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(100).hue(), 100);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(100).hue(), 100);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(460).hue(), 100);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(-260).hue(), 100);
});

it('Setting the same value', () => {
	const colorString = '#BADA55';
	const color = Color(colorString);
	const alpha = color.alpha();
	const red = color.red();
	const green = color.green();
	const blue = color.blue();
	const hue = color.hue();
	const saturation = color.saturationl();
	const saturationv = color.saturationv();
	const lightness = color.lightness();
	const whiteness = color.white();
	const blackness = color.wblack();
	const cyan = color.cyan();
	const magenta = color.magenta();
	const yellow = color.yellow();
	const black = color.black();

	equal(color.hex(), colorString);

	color.alpha(alpha);
	equal(color.alpha(), alpha);
	equal(color.hex(), colorString);

	color.red(red);
	equal(color.red(), red);
	equal(color.hex(), colorString);

	color.green(green);
	equal(color.green(), green);
	equal(color.hex(), colorString);

	color.blue(blue);
	equal(color.blue(), blue);
	equal(color.hex(), colorString);

	color.hue(hue);
	equal(color.hue(), hue);
	equal(color.hex(), colorString);

	color.saturationl(saturation);
	equal(color.saturationl(), saturation);
	equal(color.hex(), colorString);

	color.saturationv(saturationv);
	equal(color.saturationv(), saturationv);
	equal(color.hex(), colorString);

	color.lightness(lightness);
	equal(color.lightness(), lightness);
	equal(color.hex(), colorString);

	color.white(whiteness);
	equal(color.white(), whiteness);
	equal(color.hex(), colorString);

	color.wblack(blackness);
	equal(color.wblack(), blackness);
	equal(color.hex(), colorString);

	color.cyan(cyan);
	equal(color.cyan(), cyan);
	equal(color.hex(), colorString);

	color.magenta(magenta);
	equal(color.magenta(), magenta);
	equal(color.hex(), colorString);

	color.yellow(yellow);
	equal(color.yellow(), yellow);
	equal(color.hex(), colorString);

	color.black(black);
	equal(color.black(), black);
	equal(color.hex(), colorString);
});

it('Capping values', () => {
	equal(Color({
		h: 400,
		s: 50,
		l: 10,
	}).hue(), 40);
	equal(Color({
		h: 100,
		s: 50,
		l: 80,
	}).lighten(0.5).lightness(), 100);
	equal(Color({
		h: -400,
		s: 50,
		l: 10,
	}).hue(), 320);

	// 0 == 360
	equal(Color({
		h: 400,
		w: 50,
		b: 10,
	}).hue(), 40);
	equal(Color({
		h: 100,
		w: 50,
		b: 80,
	}).blacken(0.5).wblack(), 100);
	equal(Color({
		h: -400,
		w: 50,
		b: 10,
	}).hue(), 320);

	equal(Color().red(400).red(), 255);
	equal(Color().red(-400).red(), 0);
	equal(Color.rgb(10, 10, 10, 12).alpha(), 1);
	equal(Color.rgb(10, 10, 10, -200).alpha(), 0);
	equal(Color().alpha(-12).alpha(), 0);
	equal(Color().alpha(3).alpha(), 1);
});

it('Translate with channel setters', () => {
	deepEqual(Color({
		r: 0,
		g: 0,
		b: 0,
	}).lightness(50).hsl().object(), {
		h: 0,
		s: 0,
		l: 50,
	});
	deepEqual(Color({
		r: 0,
		g: 0,
		b: 0,
	}).red(50).green(50).hsv().round().object(), {
		h: 60,
		s: 100,
		v: 20,
	});
});

it('CSS String getters', () => {
	equal(Color('rgb(10, 30, 25)').hex(), '#0A1E19');
	equal(Color('rgb(10, 30, 25, .5)').hex(), '#0A1E19');
	equal(Color('rgb(10, 30, 25, 1)').hexa(), '#0A1E19FF');
	equal(Color('rgb(10, 30, 25, 0.4)').hexa(), '#0A1E1966');
	equal(Color('rgb(10, 30, 25, 0)').hexa(), '#0A1E1900');
	equal(Color('rgb(10, 30, 25, 0.01)').hexa(), '#0A1E1903');
	equal(Color('rgb(10, 30, 25)').rgb().string(), 'rgb(10, 30, 25)');
	equal(Color('rgb(10, 30, 25, 0.4)').rgb().string(), 'rgba(10, 30, 25, 0.4)');
	equal(Color('rgb(10, 30, 25)').percentString(), 'rgb(4%, 12%, 10%)');
	equal(Color('rgb(10, 30, 25, 0.3)').percentString(), 'rgba(4%, 12%, 10%, 0.3)');
	equal(Color('rgb(10, 30, 25)').hsl().string(), 'hsl(165, 50%, 7.8%)');
	equal(Color('rgb(10, 30, 25, 0.3)').hsl().string(), 'hsla(165, 50%, 7.8%, 0.3)');
	equal(Color({
		h: 0,
		s: 0,
		v: 100,
	}).hsl().string(), 'hsl(0, 0%, 100%)');
	equal(Color('rgb(10, 30, 25)').hwb().string(0), 'hwb(165, 4%, 88%)');
	equal(Color('rgb(10, 30, 25, 0.3)').hwb().string(0), 'hwb(165, 4%, 88%, 0.3)');
	equal(Color('rgb(0, 0, 255)').keyword(), 'blue');
	equal(Color.rgb(155.5, 243.1555, 88.1999).string(), 'rgb(156, 243, 88)');
});

it('Number getters', () => {
	equal(Color('rgb(10, 30, 25)').rgbNumber(), 0xA_1E_19);
});

it('luminosity, etc.', () => {
	equal(Color('white').luminosity(), 1);
	equal(Color('black').luminosity(), 0);
	equal(Color('red').luminosity(), 0.2126);
	equal(Color('white').contrast(Color('black')), 21);
	equal(Math.round(Color('white').contrast(Color('red'))), 4);
	equal(Math.round(Color('red').contrast(Color('white'))), 4);
	equal(Color('blue').contrast(Color('blue')), 1);
	ok(Color('black').isDark());
	ok(!Color('black').isLight());
	ok(Color('white').isLight());
	ok(!Color('white').isDark());
	ok(Color('blue').isDark());
	ok(Color('darkgreen').isDark());
	ok(Color('pink').isLight());
	ok(Color('goldenrod').isLight());
	ok(Color('red').isDark());
});

it('Manipulators wo/ mix', () => {
	deepEqual(Color({
		r: 67,
		g: 122,
		b: 134,
	}).grayscale().rgb().round().object(), {
		r: 107,
		g: 107,
		b: 107,
	});
	deepEqual(Color({
		r: 67,
		g: 122,
		b: 134,
	}).negate().rgb().round().object(), {
		r: 188,
		g: 133,
		b: 121,
	});
	equal(Color({
		h: 100,
		s: 50,
		l: 60,
	}).lighten(0.5).lightness(), 90);
	equal(Color({
		h: 100,
		s: 50,
		l: 60,
	}).darken(0.5).lightness(), 30);
	equal(Color({
		h: 100,
		w: 50,
		b: 60,
	}).whiten(0.5).white(), 75);
	equal(Color({
		h: 100,
		w: 50,
		b: 60,
	}).blacken(0.5).wblack(), 90);
	equal(Color({
		h: 100,
		s: 40,
		l: 50,
	}).saturate(0.5).saturationl(), 60);
	equal(Color({
		h: 100,
		s: 80,
		l: 60,
	}).desaturate(0.5).saturationl(), 40);
	equal(Color({
		r: 10,
		g: 10,
		b: 10,
		alpha: 0.8,
	}).fade(0.5).alpha(), 0.4);
	equal(Color({
		r: 10,
		g: 10,
		b: 10,
		alpha: 0.5,
	}).opaquer(0.5).alpha(), 0.75);
	equal(Color({
		h: 60,
		s: 0,
		l: 0,
	}).rotate(180).hue(), 240);
	equal(Color({
		h: 60,
		s: 0,
		l: 0,
	}).rotate(-180).hue(), 240);
});

it('Mix: basic', () => {
	equal(Color('#f00').mix(Color('#00f')).hex(), '#800080');
});

it('Mix: weight', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.25).hex(), '#BF0040');
});

it('Mix: alpha', () => {
	equal(Color('rgba(255, 0, 0, 0.5)').mix(Color('#00f')).rgb().string(0), 'rgba(64, 0, 191, 0.75)');
});

it('Mix: 0%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0).hex(), '#FF0000');
});

it('Mix: 25%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.25).hex(), '#BF0040');
});

it('Mix: 50%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.5).hex(), '#800080');
});

it('Mix: 75%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.75).hex(), '#4000BF');
});

it('Mix: 100%', () => {
	equal(Color('#f00').mix(Color('#00f'), 1).hex(), '#0000FF');
});

it('Level', () => {
	equal(Color('white').level(Color('black')), 'AAA');
	equal(Color('grey').level(Color('black')), 'AA');
});

it('Exceptions', () => {
	throws(() => {
		Color('unknow');
	}, /Unable to parse color from string/);

	throws(() => {
		Color({});
	}, /Unable to parse color from object/);

	throws(() => {
		Color('');
	}, /Unable to parse color from string/);
});

it('Should parse alphas in RGBA hex notation correctly', () => {
	// Tests for regression of #174
	notStrictEqual(
		Color('#000000ab').alpha(),
		Color('#000000aa').alpha(),
	);
});

it('OKLCH color space support', () => {
	// Test basic OKLCH construction
	const oklchColor = Color.oklch(70, 0.15, 180);
	deepEqual(oklchColor.oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
	});

	// Test OKLCH with alpha
	const oklchAlpha = Color.oklch(70, 0.15, 180, 0.8);
	equal(oklchAlpha.alpha(), 0.8);
	deepEqual(oklchAlpha.oklch().object(), {
		okl: 70,
		okc: 0.15,
		okh: 180,
		alpha: 0.8,
	});

	// Test OKLCH from object
	const oklchFromObject = Color({okl: 50, okc: 0.1, okh: 120});
	deepEqual(oklchFromObject.oklch().object(), {
		okl: 50,
		okc: 0.1,
		okh: 120,
	});

	// Test OKLCH conversions to RGB
	const oklchToRgb = Color.oklch(70, 0.15, 180).rgb().round();
	ok(oklchToRgb.red() >= 0 && oklchToRgb.red() <= 255);
	ok(oklchToRgb.green() >= 0 && oklchToRgb.green() <= 255);
	ok(oklchToRgb.blue() >= 0 && oklchToRgb.blue() <= 255);

	// Test RGB to OKLCH conversion
	const rgbToOklch = Color.rgb(255, 0, 0).oklch();
	ok(rgbToOklch.oklch().array()[0] > 0); // L should be positive
	ok(rgbToOklch.oklch().array()[1] >= 0); // C should be non-negative
	ok(rgbToOklch.oklch().array()[2] >= 0 && rgbToOklch.oklch().array()[2] <= 360); // H should be 0-360

	// Test immutability
	const original = Color.oklch(60, 0.1, 90);
	const modified = Color.oklch(70, 0.2, 120);
	notStrictEqual(original, modified);
	equal(original.oklch().array()[0], 60);
	equal(modified.oklch().array()[0], 70);

	// Test array construction
	const oklchFromArray = Color.oklch([60, 0.12, 45]);
	deepEqual(oklchFromArray.oklch().array(), [60, 0.12, 45]);

	// Test string representation
	const oklchString = Color.oklch(70, 0.15, 180).oklch().string();
	ok(typeof oklchString === 'string');
});

it('OKLCH string parsing', () => {
	// Test OKLCH string parsing with percentage lightness
	const oklchPercent = Color('oklch(70% 0.15 180)');
	deepEqual(oklchPercent.oklch().array(), [70, 0.15, 180]);

	// Test OKLCH string parsing with decimal lightness
	const oklchDecimal = Color('oklch(0.7 0.15 180)');
	deepEqual(oklchDecimal.oklch().array(), [70, 0.15, 180]);

	// Test OKLCH string parsing with alpha using slash notation
	const oklchAlpha = Color('oklch(70% 0.15 180 / 0.8)');
	deepEqual(oklchAlpha.oklch().array(), [70, 0.15, 180, 0.8]);

	// Test OKLCH string parsing with percentage alpha
	const oklchAlphaPercent = Color('oklch(70% 0.15 180 / 80%)');
	deepEqual(oklchAlphaPercent.oklch().array(), [70, 0.15, 180, 0.8]);

	// Test OKLCH string parsing with spaces
	const oklchSpaced = Color('oklch( 70% 0.15 180 )');
	deepEqual(oklchSpaced.oklch().array(), [70, 0.15, 180]);

	// Test OKLCH string parsing with commas
	const oklchCommas = Color('oklch(70%, 0.15, 180)');
	deepEqual(oklchCommas.oklch().array(), [70, 0.15, 180]);

	// Test case insensitive
	const oklchUpper = Color('OKLCH(70% 0.15 180)');
	deepEqual(oklchUpper.oklch().array(), [70, 0.15, 180]);

	// Test conversion to other formats works
	const oklchToRgb = Color('oklch(70% 0.15 180)').rgb().round();
	ok(oklchToRgb.red() >= 0 && oklchToRgb.red() <= 255);
	ok(oklchToRgb.green() >= 0 && oklchToRgb.green() <= 255);
	ok(oklchToRgb.blue() >= 0 && oklchToRgb.blue() <= 255);

	// Test invalid OKLCH strings
	throws(() => {
		Color('oklch(150% 0.15 180)'); // Lightness > 100%
	}, /Unable to parse color from string/);

	throws(() => {
		Color('oklch(70% 2.0 180)'); // Chroma > 1
	}, /Unable to parse color from string/);

	throws(() => {
		Color('oklch(70% 0.15 400)'); // Hue > 360
	}, /Unable to parse color from string/);

	throws(() => {
		Color('oklch(70% 0.15)'); // Missing hue
	}, /Unable to parse color from string/);

	throws(() => {
		Color('oklch(invalid)'); // Invalid format
	}, /Unable to parse color from string/);
});

it('High precision RGBA parsing', () => {
	// Test high precision floating point RGBA values that color-string doesn't handle
	const highPrecisionRgba = Color('rgba(254.99999999999997, 254.99999999999997, 254.99999999999997, 1)');
	deepEqual(highPrecisionRgba.rgb().array(), [255, 255, 255]);

	// Test fractional RGB values (should round)
	const fractionalRgb = Color('rgba(255.7, 128.3, 64.9, 0.8)');
	deepEqual(fractionalRgb.rgb().array(), [255, 128, 65, 0.8]);

	// Test percentage RGB
	const percentRgb = Color('rgba(100%, 50%, 25%, 80%)');
	deepEqual(percentRgb.rgb().array(), [255, 127, 64, 0.8]);

	// Test space-separated format
	const spaceSeparated = Color('rgba(200.5 100.5 50.5 / 0.5)');
	deepEqual(spaceSeparated.rgb().array(), [201, 101, 51, 0.5]);
});
