# 几何前沿日报 · 2026-11-02

已收录 32/32 · 解读 32/32。

## The Hibi--Li (2016) conjecture is fully resolved

Dave Goel

作者在Fourier已证明的面数不等式基础上，研究有限偏序集的order与chain多胞体等号问题。若n元偏序集含指定五元X为诱导子偏序，则对2≤k≤n−1，chain多胞体比order多胞体至少多C(n−3,k−2)个k维面；每个n≥5均有例子同时达到所有这些下界。

Hibi and Li conjectured that the order polytope $\mathcal{O}(P)$ of a finite poset $P$ has at most as many faces of each dimension as its chain polytope $\mathcal{C}(P)$, and that equality in some dimension $k$ with $1\leq k\leq|P|-1$ forces the two polytopes to be unimodularly equivalent. Fourier proved the inequality in a 2026 preprint. Let $X$ be the five-element poset in which an element lies above two incomparable elements and below two other incomparable elements. Building on Fourier's proof, we show that if an $n$-element poset contains $X$ as an induced subposet, then, for every $k$ with $2\leq k\leq n-1$, its chain polytope has at least $\binom{n-3}{k-2}$ more $k$-dimensional faces than its order polytope, and that for every $n\geq5$ some $n$-element poset containing $X$ attains all these bounds at once. Since Hibi and Li showed that $\mathcal{O}(P)$ and $\mathcal{C}(P)$ are unimodularly equivalent exactly when $P$ does not contain $X$, this proves the equality statement for these $k$. For $k=1$ the equality statement is false: $\mathcal{O}(X)$ and $\mathcal{C}(X)$ have equally many edges (Hibi, Li, Sahara and Shikama) but are not unimodularly equivalent. With Fourier's inequality, these results settle the conjecture. Every result is formally verified in Lean 4, with only published results and two results of Fourier's preprint as axioms.

明确披露 AI 协作：作者第15页明确称工作压倒性主要由Claude和ChatGPT完成、作者监督并承担责任，因此有明确AI使用披露。声明没有逐项说明模型承担研究路线、证明、代码、检索还是写作；不能仅从广泛表述推断某个具体核心想法或把Lean形式化本身作AI证据，usage暂不细分。

来源：https://arxiv.org/pdf/2610.40703v1 · PDF第15页 Acknowledgments

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者第15页明确称工作压倒性主要由Claude和ChatGPT完成、作者监督并承担责任，因此有明确AI使用披露。声明没有逐项说明模型承担研究路线、证明、代码、检索还是写作；不能仅从广泛表述推断某个具体核心想法或把Lean形式化本身作AI证据，usage暂不细分。

来源：https://arxiv.org/pdf/2610.40703v1

[arXiv](https://arxiv.org/abs/2610.40703)

## Systolic Geometry and Combinatorics of Surfaces

Achintya Dey

论文结合平移曲面上图的systolic嵌入与双曲曲面短测地线结构：证明本质及胞腔systolic嵌入的存在，并确定某些图族的极值属数；在Thurston集合内构造增加systole长度的单参数变形，于无限多个属数产生由systolic测地线分割为三角形的Bolza-like曲面。

This thesis investigates two themes. The first studies systolic embeddings of graph on translation surfaces, proving existence results for essential and cellular systolic embeddings and determining extremal genera for certain graph families. The second examines hyperbolic surfaces in the Thurston set, constructing a one-parameter deformation that increases the sys- tole length and produces Bolza-like surfaces, i.e., surfaces whose systolic geodesics decompose the surfaces into triangles, for infinitely many genera. A symmetry property of geodesic inter- sections on these surfaces is also established, together with an application of these Bolza-like surfaces.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。100页学位论文的全文关键词和元数据检索无AI使用披露，另读第5页学术声明及第14–16页致谢，未见正向声明。机器因第2、4、6、11、13、96页短文本而标extractionComplete=false；这六页已逐页110dpi渲染并实际看图，全部纯空白、无隐藏正文或披露。保留原提取标记及短页列表，视觉仅补足这六个空白页缺口；未观察到披露不等于证明未使用AI。另逐页查看文本过短页面的渲染图，确认仅为空白页或章节扉页。

来源：https://arxiv.org/pdf/2610.40750v1

[arXiv](https://arxiv.org/abs/2610.40750)

## Exotic involutions on irreducible 4-manifolds from Real Seiberg--Witten theory

Woohyeok Jo、Simone Tagliente

在适当Real Seiberg–Witten假设、X非自旋且不动点集补空间单连通时，作者把此前X#反向CP²上的exotic对合构造推进到X本身，无需额外反向CP²连通和；同时在商中得到拓扑同痕但非光滑同痕的分支曲面嵌入无穷族。

Using Real Seiberg--Witten theory, Miyazawa constructed infinitely many exotic involutions on ${\overline{\mathbb{CP}}{}^2}$, and Baraglia extended this construction to $X\#{\overline{\mathbb{CP}}{}^2}$ for a broad class of $4$-manifolds $X$ equipped with an involution $c$. We show that, under suitable Real Seiberg--Witten hypotheses, the ${\overline{\mathbb{CP}}{}^2}$ summand can be omitted when $X$ is non-spin and the complement of the fixed locus is simply-connected. Our construction also yields infinite families of topologically isotopic but smoothly non-isotopic embeddings of the branch surface in the quotient $X/\langle c\rangle$. As applications, we construct anti-holomorphic involutions on irreducible, simply-connected projective surfaces of general type with infinitely many exotic copies, none of which is anti-symplectic with respect to any orientation-compatible symplectic form. These surfaces include cyclic branched covers of $\mathbb{CP}^2$ and complete intersections of multidegree $(2,4k)$ in $\mathbb{CP}^4$.

明确披露 AI 协作：作者第5页致谢明确本项目使用AI和LLM仅限文献研究，因此只标literature。第24页Jean-Claude Hausmann是文献作者姓名，不能作为模型或额外使用证据。

来源：https://arxiv.org/pdf/2610.40802v1 · PDF第5页 Acknowledgments；第24页姓名命中已排除

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者第5页致谢明确本项目使用AI和LLM仅限文献研究，因此只标literature。第24页Jean-Claude Hausmann是文献作者姓名，不能作为模型或额外使用证据。

来源：https://arxiv.org/pdf/2610.40802v1

[arXiv](https://arxiv.org/abs/2610.40802)

## Generic properties of the Laplace spectrum and eigenfunctions

Oliver Fürst、Eva-Maria Hekkelman、Malte Leimbach

主定理适用于连通、光滑、紧无边界且维数d≥2的流形：在全体光滑度量的C∞ Fréchet拓扑中，非零Laplace谱Q线性无关及正特征值对应本征函数的全部有限单项式线性无关构成residual性质；并且在每一个固定共形类中仍为residual。正文还给出所有非零特征值有理幂组成集合的Q线性无关性，比摘要的普通非共振更强。

We prove that the spectrum of the Laplace--Beltrami operator on compact Riemannian manifolds without boundary is generically linearly independent over $\mathbb{Q}$. Furthermore, we prove that pointwise products of eigenfunctions generically are linearly independent. The proof is based on conformal perturbations of the metric. The result implies in particular that generically the truncation of the continuous functions on $M$ by spectral projections of the Laplace operator is given by symmetric matrices.

明确披露 AI 协作：第5页明确将把扰动公式(3)作为伪微分算子分析的关键证明路线归于AI，并称模型辅助计算第3节部分符号，故ideas和computation有具体证据。Claude Opus4.8/5还帮助了解genericity与扰动文献，Opus5.5用于校对和小幅符号改进；作者明确否认除这些修正外由AI实际撰写正文和证明，不应扩大为完整证明由AI生成。

来源：https://arxiv.org/pdf/2610.40859v1 · PDF第5页 AI usage

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第5页明确将把扰动公式(3)作为伪微分算子分析的关键证明路线归于AI，并称模型辅助计算第3节部分符号，故ideas和computation有具体证据。Claude Opus4.8/5还帮助了解genericity与扰动文献，Opus5.5用于校对和小幅符号改进；作者明确否认除这些修正外由AI实际撰写正文和证明，不应扩大为完整证明由AI生成。

来源：https://arxiv.org/pdf/2610.40859v1

[arXiv](https://arxiv.org/abs/2610.40859)

## On the estimation of the Gromov-Hausdorff distance

Emin Abdullaev

作者引入度量空间的κ-traces，建立GH距离的一般下界，应用于空间与其Hausdorff超空间的距离估计及超空间超限塔的度量行为；还研究ℓ^p乘积，并借Erdős–Rado定理和Ramsey理论计算无限ℓ∞乘积的traces，在充分条件下精确确定乘积间GH距离。

The paper investigates the Gromov--Hausdorff distance using a new tool, the so-called $\varkappa$-traces of metric spaces. A general lower bound for the Gromov--Hausdorff distance is obtained in terms of $\varkappa$-traces. Using this bound, exact estimates for the distance between an arbitrary metric space and its Hausdorff hyperspace are derived, and the behavior of the metric on transfinite towers (inductive limits) of hyperspaces is studied. In the final part of the paper, the trace machinery is applied to $l^p$-products of metric spaces. A connection is established between computing the Gromov--Hausdorff distance for infinite $l^\infty$-products and partition calculus. Using methods from Ramsey theory (in particular, the Erdos--Rado theorem), $\varkappa$-traces for $l^\infty$-products are computed, and sufficient conditions are obtained under which the Gromov--Hausdorff distance between infinite Cartesian products can be computed exactly. The final section also provides a general estimate for the Gromov--Hausdorff distance between $l^\infty$-products of metric spaces using the Erdos--Rado theorem.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。23页PDF提取完整、页数匹配、无短文本页；已核对第3页致谢，全文及元数据、A.I.点写、断行/连字符模型名和Danus补检均未发现作者AI使用声明。未观察到披露不等于确认未使用。

来源：https://arxiv.org/pdf/2610.40873v1

[arXiv](https://arxiv.org/abs/2610.40873)

## On lens spaces which may embed in the complex projective plane

Giulia Carfora

作者利用Owens基于Donaldson对角化定理的障碍，分类Lisca类型(2)或(3)透镜空间中哪些未被该障碍排除嵌入同调复射影平面；对p为偶数的L(p,q)，再用Lidman–Moore–Vazquez基于Lin工作的障碍细化筛选。

Using an obstruction derived by Owens and relying on Donaldson's Diagonalisation Theorem, we obtain a complete classification of lens spaces of Lisca type $(2)$ or $(3)$ that are unobstructed from embedding in a homology complex projective plane. This classification is further refined for lens spaces $L(p,q)$ with $p$ even, using an obstruction due to Lidman--Moore--Vazquez based on work of Lin. This article is extracted from the author's PhD thesis.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第13页Tool Use明确文章及计算由作者独立完成，说明使用GAP作普通计算并明确No AI tools were used。否定声明及GAP软件本身均不是AI使用证据。14页PDF完整提取、无短文本页，补检无新增声明。

来源：https://arxiv.org/pdf/2610.40957v1

[arXiv](https://arxiv.org/abs/2610.40957)

## Isometric Embeddings of Asymptotically Hyperbolic Manifolds into Hyperbolic Space

Marco Usula

在具有光滑共形紧化的m维渐近双曲流形（m≥2）上，作者给出嵌入高维双曲空间的充要条件：存在将边界映到无穷远边界、横截该边界的光滑等距p-嵌入，当且仅当 |Ric_g+(m−1)g|_g=O(x²)。这里x为任意边界定义函数；不是只要求曲率趋于−1就能嵌入。

The Nash Embedding theorem asserts that every closed Riemannian manifold can be isometrically embedded into a Euclidean space of sufficiently high dimension. In this paper, we address the asymptotically hyperbolic version of the problem. We prove that an asymptotically hyperbolic manifold $\left(M,g\right)$ can be realized as a submanifold of a sufficiently high-dimensional hyperbolic space $\mathrm{H}^{N+1}$, intersecting the sphere at infinity transversely, if and only if $g$ is asymptotically Poincaré-Einstein to second order.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。12页PDF提取完整、页数匹配、无短文本页；核对第3页致谢及全文披露检索，点写A.I.、断行/连字符模型名及Danus补检也未发现本作者AI使用声明。不等同于确认未使用。

来源：https://arxiv.org/pdf/2610.40962v1

[arXiv](https://arxiv.org/abs/2610.40962)

## Handlebodies separate elements of surface groups

Richard Hain

作者给出一个似为folklore结果的证明：闭可定向曲面X基本群的每个非平凡元素，在某个以X为边界的把手体的基本群中仍非平凡。证明上传是为了服务映射类群在配置空间上的作用这一合作项目。

In this note I prove that every non-trivial element of the fundamental group of a closed orientable surface X is non-trivial in the fundamental group of some handlebody with boundary X. This result appears to be folklore. I have uploaded a proof as the result is needed in a joint project with Clement Dupont on mapping class group actions on configuration spaces.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第1页AI statement明确未用LLM建议证明、生成例子或辅助写作，属于否定相关用途而非使用证据；致谢将策略建议归于Sebastian Hensel。4页PDF提取完整、无短文本页，补检未见其他正向声明。

来源：https://arxiv.org/pdf/2610.40987v1

[arXiv](https://arxiv.org/abs/2610.40987)

## Steady conformally Kähler Ricci solitons with isoparametric potential

Ernani Ribeiro Jr、Hung Tran

定理1.1在完备、连通、非紧、单连通、不可约四维稳态梯度Ricci孤立子上，只要求非恒定leafwise transnormal势（每个正则等值集的每个连通分支上|∇f|²常）及全局共形Kähler，不另加曲率或渐近假设。按等距、整体缩放及势加常数分类：R⁴ nuts的δ≤0；O(−1)、O(−2) bolts的µ<0；每个m≥3的O(−m) bolts的µ≤µ_m<0；S²×R²的untwisted bolts的µ<0。

We classify complete, non-compact, simply connected, irreducible four-dimensional steady gradient Ricci solitons that are globally conformally Kähler and have an isoparametric potential. The steady Ricci solitons are $U(2)$-invariant nuts on $\mathbb R^4$, including the Bryant and Cao solitons, and bolts on $\mathbb{S}^2 \times \mathbb R^2$ and on $\mathcal O(-m)\to\mathbb{CP}^1$. For each $m\ge3$ there is exactly one non-collapsed bolt. A key step, valid for Ricci solitons of every sign, is that away from the locally conformally flat case, the conformal factor is aligned with the potential function, which yields cohomogeneity-one symmetry.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第4页标题虽为Declaration of AI Usage，但正文只明确本工作部分受ChatGPT for Academic Researchers项目的OpenAI模型访问授权资助，随后声明所有证明完全由作者撰写并负责；并未明确实际调用模型或其参与写作、计算、证明的事实。资源访问机会本身不推成实际AI协作，亦不能由作者写证明推出未在其他环节使用AI。35页PDF完整提取、无短文本页，补检没有更具体的使用陈述。此处为保守证据边界判定，不是无AI使用认证。

来源：https://arxiv.org/pdf/2610.40994v1

[arXiv](https://arxiv.org/abs/2610.40994)

## Lengths of closed geodesics on random non-compact hyperbolic surfaces

Malo Gatignol、Joe Thomas

研究属g且有n(g)个尖点的Weil–Petersson随机双曲曲面上本原闭测地线数量，作者在所述尖点增长范围内得到Poisson极限，参数显式依赖n(g)²/g的极限。证明依靠n(g)/g→0区间的WP模空间体积一阶展开，另有小Laplace特征值的存在性结果。

We study the asymptotic distribution of the number of primitive, closed geodesics on Weil-Petersson random hyperbolic surfaces with genus $g$ and $n(g)$ cusps, under various growth rates of $n(g)$ as $g\to\infty$. We prove that the limiting distribution is Poisson with parameter depending explicitly on the limit of $n(g)^2/g$. This work is inspired by that of Mirzakhani and Petri's on closed surfaces and Hide and Thomas when $g$ is fixed. Our proof relies on first order expansions for Weil-Petersson moduli space volumes in the $n(g)/g\to 0$ regime. We also obtain some new existence results for small Laplacian eigenvalues.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第8页AI Disclosure明确称工作各阶段均未使用AI；这是否定声明。51页PDF完整提取、页数匹配、无短文本页，全文与补充检索无新增正向证据。

来源：https://arxiv.org/pdf/2610.41002v1

[arXiv](https://arxiv.org/abs/2610.41002)

## The Berger conjecture for three dimensional manifolds

Jakob Dittmer

作者声称证明三维Berger猜想：若三维单连通黎曼流形的所有测地线均闭合，则所有单位速测地线具有相同最短周期，即由最小共同周期归一化的测地流S¹作用在单位切丛上自由。另有定理给出测地流商空间同胚于S²×S²。

A conjecture of Berger says that on a simply connected manifold all of whose geodesics are closed, all unit speed geodesics have the same shortest period. In this paper we will show that the S^1-action induced by the geodesic flow is free. We use symplectic geometry to investigate the topology of the quotient of the unit tangent bundle T^1M/S^1 by the S^1 action that comes from the geodesic flow. We show that this quotient admits the structure of a smooth symplectic manifold and that this symplectic manifold is symplectomorphic to S^2 \times S^2 equipped with a split form. This will enable a computation involving the Euler class of the orbibundle T^1M\rightarrow T^1M/S^1 which will lead to a solution of Berger's conjecture for three-dimensional manifolds.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。29页PDF提取完整、页数匹配、无短文本页；第2页致谢将Berger问题攻击策略归于导师Burkhard Wilking，全文及元数据披露检索、A.I.点写、断行/连字符模型名和Danus补检未发现作者AI使用声明。不等于确认未使用。

来源：https://arxiv.org/pdf/2610.41006v1

[arXiv](https://arxiv.org/abs/2610.41006)

## Conformal geodesics and gauged Killing-Yano forms in dimension four

Wojciech Kryński

研究四维反自对偶共形流形上共形测地线与共形 Killing–Yano 二形式的关系。平坦情形由扭量二次曲面产生自对偶 CKY 形式，其零集包含共形测地线；曲率情形则引入取值于线丛、耦合反自对偶曲率联络的规范 CKY 形式，给出非零型共形测地线作为零曲线的局部环境刻画，相关联络曲率沿该曲线消失。

We study the relation between conformal geodesics and conformal Killing-Yano (CKY) 2-forms on anti-self-dual conformal manifolds of dimension 4. In the flat case, twistor quadrics determine self-dual CKY forms whose zero loci contain conformal geodesics. To extend this construction to curved manifolds, we consider self-dual 2-forms with values in a line bundle and satisfying the gauged CKY equation, coupled to connections with anti-self-dual curvature. In this way we provide a local ambient characterization of non-null conformal geodesics as zero curves of gauged CKY forms, with the curvature vanishing along these curves.

明确披露 AI 协作：作者在 AI disclosure 明确说明 ChatGPT 用于扭量方法的文献搜索、Theorem 4.2 证明中的张量计算和语言核查。语言 verification 是文字用途，不据此标数学验证；未将核心思想归给模型。

来源：https://arxiv.org/pdf/2610.41008v1 · PDF 第 3 页 AI disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者在 AI disclosure 明确说明 ChatGPT 用于扭量方法的文献搜索、Theorem 4.2 证明中的张量计算和语言核查。语言 verification 是文字用途，不据此标数学验证；未将核心思想归给模型。

来源：https://arxiv.org/pdf/2610.41008v1

[arXiv](https://arxiv.org/abs/2610.41008)

## The Table Problem for Convex Domains

Ali Naseri Sadr

证明平面有界凸域的广义桌子定理，并建立平面紧支撑函数的桌子问题变体。方法把曲面上的桌子问题转化为曲面切丛内一族星形曲线配置的内接正方形问题。

We prove a generalized Table Theorem for bounded convex domains in the plane. Then we prove a variation of the Table Problem for compactly supported functions on the plane. Our method is based on relating the table problem on a surface to the square peg problem for a configuration of star-shaped curves in the tangent bundle of the surface.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文及补充模型名检索未发现作者自用 AI 的正面披露；AI Declaration 明确称未用 AI 工具撰写文章且思想由作者提出。这一否定陈述不作为使用证据，也不扩张为对所有未披露活动的判断。

来源：https://arxiv.org/pdf/2610.41010v1

[arXiv](https://arxiv.org/abs/2610.41010)

## Bounds for lattice points in terms of volume and successive minima

Jun Wang、Fei Xue

对非空内部的n维凸体K和满秩格Λ，作者声称证明含体积的Betke–Henk–Wills上界：格点数不超过vol(K)/detΛ乘以各(1+iλ_i/2)的乘积，λ_i为(K−K)/2的逐次极小值。等号当且仅当K是一个格向量平移的、正整数倍的幺模单纯形。另给出一般维内部格点数的线性下界和平面λ₂≤1时的乘积下界。

We prove, in every dimension, the upper bound conjectured by Betke, Henk and Wills for the lattice-point enumerator in terms of volume and successive minima. For every convex body $K\subset R^n$ and full-rank lattice $\Lambda$, we establish $$ \#(K\cap\Lambda)\le\frac{\mathrm{vol}_n(K)}{\det\Lambda}\prod_{i=1}^n\left(1+\frac{i\lambda_i}{2}\right), $$ where $\lambda_i$ are the successive minima of $(K-K)/2$ with respect to $\Lambda$. Equality holds precisely for lattice translates of positive integral dilates of unimodular simplices. We also prove $$ \#(\mathrm{int}K\cap\Lambda)\ge\frac{\mathrm{vol}_n(K)}{\det\Lambda} \left(1-\frac{n}{4}\sum_{i=1}^{n-1}\lambda_i-\frac{n}{2}\lambda_n\right), $$ which implies the lower estimate with factor $1-\frac{1}{2}\sum_{i=1}^n i\lambda_i$. In dimension two we prove the lower bound with factor $(1-\lambda_1/2)(1-\lambda_2)$ when $\lambda_2\le1$. We also observe that a conjectured product lower bound for origin-symmetric bodies fails in dimension three. The proofs combine geometric compression, lattice-cell counts in coordinate sections, and an elementary coefficient comparison.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。已检索完整 18 页文本及点写 AI、跨行模型名、Danus，核对首页及末尾正文、参考文献，未观察到作者自用生成式 AI 的正面披露。这不等于确认未用 AI。

来源：https://arxiv.org/pdf/2610.41125v1

[arXiv](https://arxiv.org/abs/2610.41125)

## Only constant mean curvature surfaces in $E(κ,τ)$, $τ\ne0$, have a holomorphic original Abresch-Rosenberg differential

Hilário Alencar、Harold Rosenberg

对光滑、连通、有向浸入曲面，取 S=−∇N、H=trS/2。Theorem1.1：任意 κ∈R、τ≠0 的 E(κ,τ) 中，原始 Q_AR=[2(H+iτ)p−(κ−4τ²)A²]dζ² 全纯当且仅当 H 恒定；包含 κ=4τ² 的圆球背景，无完备、紧致或解析性假设。在假设 dH≠0 的区域，S 在 (∇H/|∇H|,J∇H/|∇H|) 标架中为 [[0,τ],[τ,2H]]，从而 detS=−τ²、曲面内蕴 K=(κ−4τ²)u²。τ=0 时逆命题一般失败；κ≠0 的乘积背景中，所有非 CMC 例外 dH 处处非零、角函数为 u₀∉{0,±1} 常数、∇H 为零主曲率方向且平行竖直场的切向部分，并局部属于显式常角族。闭曲面因 H 有临界点而仍为 CMC。

For immersed surfaces in the homogeneous spaces $E(\kappa,\tau)$ with $\tau\ne0$, we prove that the original Abresch--Rosenberg differential $[2(H+i\tau)p-(\kappa-4\tau^2)A^2]\,d\zeta^2$ is holomorphic if and only if the mean curvature $H$ is constant; here $p\,d\zeta^2$ is the Hopf differential and $A=\langle\xi,\partial_\zeta\rangle$. The result is local: no completeness, compactness or analyticity is assumed, and there are no exceptional surfaces. Where $dH\ne0$, holomorphy forces the shape operator into the normal form $\bigl(\begin{smallmatrix}0&\tau\\\tau&2H\end{smallmatrix}\bigr)$ in the frame $(\nabla H/|\nabla H|,J\nabla H/|\nabla H|)$. The round case $\kappa=4\tau^2$ is settled by an elementary argument; for $\kappa\ne4\tau^2$ the structure equations become a rational system whose solutions are algebraic, and an embedding into a field of Puiseux series excludes every branch. In $M^2(\kappa)\times\mathbb{R}$, $\kappa\ne0$, where the statement fails, we show that a non-CMC surface with holomorphic original differential has nowhere vanishing $dH$ and constant angle function, and belongs to an explicit family; in particular, closed surfaces with holomorphic original differential are CMC there. We also show that the Hopf-cylinder alternative in a theorem of Dorfmeister, Inoguchi and Kobayashi contains no non-CMC surface.

明确披露 AI 协作：首页说明 Claude 用于英语编辑、作者制作内容的表格排版、适配期刊 LaTeX 模板，以及讨论和核查部分计算；数学内容、命题和证明归作者。仅据明确用途记文字、计算讨论及核查，不推断核心思想或证明由模型提出。

来源：https://arxiv.org/pdf/2610.41197v1 · PDF 第 1 页 Use of generative AI 脚注

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。首页说明 Claude 用于英语编辑、作者制作内容的表格排版、适配期刊 LaTeX 模板，以及讨论和核查部分计算；数学内容、命题和证明归作者。仅据明确用途记文字、计算讨论及核查，不推断核心思想或证明由模型提出。

来源：https://arxiv.org/pdf/2610.41197v1

[arXiv](https://arxiv.org/abs/2610.41197)

## Orientations for skein-valued curve counting

Brett Parker

针对 Calabi–Yau 三维流形中 Maslov 零 Lagrangian 边界的全纯曲线计数，证明 worldsheet skein 关系消去余维一边界层所需的定向比较。标准 Cauchy–Riemann Fredholm 定向在双曲边界交叉处产生依赖于交叉点属于同一还是不同边界分支的符号，与 HOMFLYPT skein 代数的统一交叉关系不符；作者通过反全纯定向约定解决该符号问题，并在六维辛流形的有向 Lagrangian 一般设置中建立所需比较。

Ekholm and Shende's skeins-on-branes formalism provides invariant counts of holomorphic curves with boundary on a Maslov zero Lagrangian within a Calabi-Yau 3-fold. This paper proves the orientation relations required for worldsheet skein relations to cancel codimension-one boundary strata. However, standard Cauchy-Riemann Fredholm orientations reveal an unexpected sign puzzle: the orientation relation at a curve with a hyperbolic boundary crossing depends on whether the crossing lies on distinct boundary components or the same component. This domain-dependent sign contradicts the uniform crossing relations of the HOMFLYPT skein algebra. We show that this discrepancy is resolved by passing to an anti-holomorphic orientation convention. We establish all required orientation comparisons in the general setting of an oriented Lagrangian submanifold of a 6-dimensional symplectic manifold.

明确披露 AI 协作：首页明确 ChatGPT、Gemini、Claude 用于起草编辑、检索文献和找出修复大量符号错误。第57页 Remark7.3 将第7.3.1节所用 bounding chain 的具体代数构造署名“by ChatGPT”，随后给出子流形方程与无内部交点论证，构成明确的具体构造归因，支持 ideas、proofs；第64页称推广到有界 Fredholm 复形的行列式约定经 ChatGPT 咨询形成。第41页关于模型能力的泛论本身不是独立使用证据。

来源：https://arxiv.org/pdf/2610.41233v1 · PDF 第 1 页脚注、第 57 页 Remark 7.3、第 64 页附录 A 开头；第 41 页为能力泛论

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。首页明确 ChatGPT、Gemini、Claude 用于起草编辑、检索文献和找出修复大量符号错误。第57页 Remark7.3 将第7.3.1节所用 bounding chain 的具体代数构造署名“by ChatGPT”，随后给出子流形方程与无内部交点论证，构成明确的具体构造归因，支持 ideas、proofs；第64页称推广到有界 Fredholm 复形的行列式约定经 ChatGPT 咨询形成。第41页关于模型能力的泛论本身不是独立使用证据。

来源：https://arxiv.org/pdf/2610.41233v1

[arXiv](https://arxiv.org/abs/2610.41233)

## Odd-Degree Rigidity and a Numerical Characterization of Complete Flag Varieties

Kiwamu Watanabe

在复数域上，完全旗 F=G/B 的 G 连通半单。Theorem1.1：光滑 Fano 簇 X 若与 F 同复维、同 Picard 数，存在任意连续奇拓扑次数映射 X→F 即得 X≅F；映射本身不必代数，也不声称该连续映射就是同构。Theorem1.2：正维光滑 Fano X 为完全旗，当且仅当伪指标ι_X≥2且 ker(Sym²N¹(X)_R→N²(X)_R) 含正定二次型；也等价于把ι_X条件替换为 −K_X∈2Pic(X)，保留同一正定核条件。正定性是对曲线数值空间 N₁(X)_R 上的二次型而言，不能误写为每个交数均为正。

Let $F=G/B$ be the complete flag variety of a connected semisimple complex linear algebraic group. We prove that if a smooth Fano variety $X$ has the same dimension and Picard number as $F$, then the existence of a continuous map $X\to F$ of odd topological degree implies $X$ is isomorphic to $F$. In particular, a smooth Fano variety homotopy equivalent to $F$ is isomorphic to $F$. The algebraic input is a numerical characterization of complete flags: a positive-dimensional smooth Fano variety $X$ is a complete flag variety if and only if its pseudoindex $\iota_X$ is at least two and ${\rm ker}({\rm Sym}^2N^1(X)_{\mathbb R}\to N^2(X)_{\mathbb R})$ contains a positive-definite quadratic form. The pseudoindex condition can equivalently be replaced by the divisibility of $-K_X$ by two in ${\rm Pic}(X)$. The key observation is that a single definite quadratic relation excludes surfaces in every fiber of any elementary contraction; standard contraction theorems then yield smooth ${\mathbb P}^1$-fibrations and the characterization of complete flags applies. For the odd-degree theorem, Poincaré duality and a mod-two Wu-class argument show that the anticanonical class is divisible by two; comparison of the integral coroot lattices then identifies the flag. Most proofs were developed through extensive discussions with OpenAI's ChatGPT (GPT-5.6 Sol and GPT-6), based on mathematical directions supplied by the author and arguments suggested by ChatGPT; see the AI Disclosure.

明确披露 AI 协作：摘要和第15–16页披露大多数证明经与 GPT-5.6 Sol/GPT-6 长期讨论形成，模型建议中间命题、证明路径和数学论证，并协助审查修订证明、文献检索、核查参考文献及稿件准备。原始 mixed-intersection 与 Dynkin 图恢复的问题明确源于作者先前研究；披露未把某一个具体核心构造或步骤单独归因模型，保守记 proofs/exploration 等，不据泛称路径建议标 ideas。

来源：https://arxiv.org/pdf/2610.41237v1 · PDF 第 1 页摘要与第 15–16 页 AI Disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。摘要和第15–16页披露大多数证明经与 GPT-5.6 Sol/GPT-6 长期讨论形成，模型建议中间命题、证明路径和数学论证，并协助审查修订证明、文献检索、核查参考文献及稿件准备。原始 mixed-intersection 与 Dynkin 图恢复的问题明确源于作者先前研究；披露未把某一个具体核心构造或步骤单独归因模型，保守记 proofs/exploration 等，不据泛称路径建议标 ideas。

来源：https://arxiv.org/pdf/2610.41237v1

[arXiv](https://arxiv.org/abs/2610.41237)

## Rigidity in sharp eigenvalue estimates for differential forms

Tsz-Kiu Aaron Chow、James Koh、Sen Yuk Wu

设 n≥3、1≤p≤n/2 为整数，曲率算子以单位球为 R=Id，特征值 μ₁≤⋯≤μ_{n(n−1)/2}，逐点假设 ∑_{j=1}^{n−p}μ_j≥n−p。闭连通 M 的 Hodge p形式第一特征值 λ₁^(p)≥p(n−p+1)；等号反推 R≥Id。p=1 时 M 本身等距单位球；p≥2 时万有覆盖微分同胚 S^n，并等距单位圆球或非圆 Sasakian 流形，非圆分支仅可能 n 奇且 p 偶。若 M 紧连通且非空光滑边界，以外法向ν定义 A(X,Y)=〈∇_Xν,Y〉，最小p个主曲率和≥0，则绝对边界谱仍有同一下界，等号当且仅当 M 等距单位半球。

For $1\leq p\leq n/2$, we derive sharp eigenvalue estimates for the Hodge Laplacian on differential $p$-forms under the curvature condition introduced by Petersen and Wink, and study their equality cases. Equality recovers the stronger curvature operator lower bound and, in the closed case, leaves only round or Sasakian metrics on the universal cover. For manifolds with boundary, weak $p$-convexity of the boundary makes the unit hemisphere the only equality case for the absolute boundary problem.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。完整 13 页正文、参考文献及附加点写/跨行模型名/Danus 检索未见作者自用 AI 正面披露；数学术语 Killing、twistor 及文献人名不构成 AI 证据。未见披露不等于证明没有使用。

来源：https://arxiv.org/pdf/2610.41297v1

[arXiv](https://arxiv.org/abs/2610.41297)

## On the geometry of asymptotically conical Ricci shrinkers (II): strong uniqueness

Yu Li、Longhuan Yan、Wenjia Zhang

对闭连通Ricci流在首次奇异时刻的一个时空完备化基点，若有一条切流由完整光滑、非Gaussian、渐近锥Ricci收缩孤立子生成（n≥3），作者证明修正流在同一个与时间无关的比较映射下趋向该孤立子，并给出扩张势函数子水平集上的定量估计；所有切流因此具有同一完成的典范模型。

We prove strong uniqueness of tangent flows at the first singular time of a closed Ricci flow when one tangent flow is generated by a complete smooth asymptotically conical Ricci shrinker. The modified flow converges to this shrinker in a fixed gauge, with quantitative estimates on expanding domains. The main ingredients are a Łojasiewicz-Simon inequality for Perelman's entropy, based on the global weighted divergence-free gauge constructed in the preceding paper, and estimates controlling the geometric radius under Ricci flow.

明确披露 AI 协作：AI declaration 明确整体策略、主要思想及相应论证由作者在2025年启动的计划中发展；自2026年8月使用 ChatGPT 协助实施部分计算、数学表述、修订和起草，特别是第3–4节。按文字与计算记，不把后续辅助误记为核心思想来源或模型独立证明。

来源：https://arxiv.org/pdf/2610.41345v1 · PDF 第 5 页 AI declaration

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI declaration 明确整体策略、主要思想及相应论证由作者在2025年启动的计划中发展；自2026年8月使用 ChatGPT 协助实施部分计算、数学表述、修订和起草，特别是第3–4节。按文字与计算记，不把后续辅助误记为核心思想来源或模型独立证明。

来源：https://arxiv.org/pdf/2610.41345v1

[arXiv](https://arxiv.org/abs/2610.41345)

## The regular set of Ricci limit spaces

Tianyin Ren

对非平凡、由完整连通n维流形在一致Ricci下界下取得的尖点GH极限，作者声称所有强正则点的维数逐点一致：存在唯一k使非空正则集R(X)=R_k(X)。这里强j正则要求每一个切锥均为欧氏R^j，目标是排除零测集上可能残留的其他正则维数。

Let $(X,d,p)$ be a nontrivial pointed Gromov--Hausdorff limit of complete connected Riemannian $n$-manifolds satisfying $\operatorname{Ric}\geq-(n-1)g$. For $1\leq j\leq n$, set \[ \mathcal{R}_j(X) = \bigl\{x\in X:\text{ every tangent cone at } x \text{ is isometric to } \mathbb{R}^j\bigr\}, \qquad \mathcal{R}(X)=\bigsqcup_{j=1}^n\mathcal{R}_j(X). \] We prove that there is a unique $k$ such that $\mathcal{R}(X)=\mathcal{R}_k(X)$, answering the pointwise regular-dimension question originating in Cheeger and Colding's work~\cite[p408]{CC97}. We construct a volume-corrected heat entropy on RCD space and identify the distributional logarithmic-density defect $\operatorname{tr}(\operatorname{Hess} f)-\Delta f$ by Green-volume regularization.

明确披露 AI 协作：致谢明确作者使用 ChatGPT/OpenAI 探索证明策略、核查计算、改进语言。未指明某一核心路线或构造由 AI 首次提出，故记 exploration 而非 ideas，也不把核查计算写成模型完成证明。

来源：https://arxiv.org/pdf/2610.41449v1 · PDF 第 30 页 Acknowledgments

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢明确作者使用 ChatGPT/OpenAI 探索证明策略、核查计算、改进语言。未指明某一核心路线或构造由 AI 首次提出，故记 exploration 而非 ideas，也不把核查计算写成模型完成证明。

来源：https://arxiv.org/pdf/2610.41449v1

[arXiv](https://arxiv.org/abs/2610.41449)

## A local-to-global fixed point theorem for $\CAT(0)$ spaces with a uniform elliptic gap

Jeroen Schillewaert

对有限生成群在完备有限几何维 CAT(0) 空间上的局部椭圆作用，若位移一致控制到椭圆固定点集的距离，则有整体固定点；任意群在同条件下得到空间内或视觉边界上的固定点。对于有限秩 R-building，在欧氏度量因子的线性像有限时给出不要求度量完备的全类型局部到整体结论，包括非离散 G̃₂ 类型；欧氏因子维数至多三时可在固定点结论中去掉线性像限制。还给出切锥间隙判据、立方情形渐近最优 d/π 界，以及 Hadamard 流形中与等距像有限稳定子一致有界的等价关系和最优多项式增长。

A finitely generated group acting locally elliptically on a complete \CAT(0) space of finite geometric dimension fixes a point if distances to elliptic fixed sets are uniformly controlled by displacements. For arbitrary groups, the same hypothesis gives a fixed point in the space or its visual boundary. The proof combines a first-moment random-walk displacement estimate with Izeki's zero-drift theorem. For finite-rank $\R$-buildings whose Euclidean metric factor has finite linear image, we obtain an all-type local-to-global theorem, including the nondiscrete $\widetilde G_2$ case, with an explicit gap and without metric completeness; the linear-image restriction can be removed from the fixed-point conclusion when the Euclidean factor has dimension at most three. A tangent-cone criterion characterizes the gap and yields a cubical bound with optimal asymptotic growth $d/\pi$ in dimension $d$. For Hadamard manifolds, the gap is equivalent to uniformly bounded finite stabilizers in the isometry image, with stabilizer bounds of optimal polynomial growth in the gap constant.

明确披露 AI 协作：致谢说明 OpenAI Astra6.0 协助审查及修订数学论证和表述、准备引言与参考文献。支持证明修订、验证与文字用途；参考文献编排不自动推断文献搜索。作者自己核验修订 AI 辅助内容，不能误作模型承担全部验证，亦无具体核心思想归因。

来源：https://arxiv.org/pdf/2610.41468v1 · PDF 第 30 页 Acknowledgements

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢说明 OpenAI Astra6.0 协助审查及修订数学论证和表述、准备引言与参考文献。支持证明修订、验证与文字用途；参考文献编排不自动推断文献搜索。作者自己核验修订 AI 辅助内容，不能误作模型承担全部验证，亦无具体核心思想归因。

来源：https://arxiv.org/pdf/2610.41468v1

[arXiv](https://arxiv.org/abs/2610.41468)

## Intersections of fractal sets with rectifiable curves

Oleg Ivrii、Truong Vu

PDF恢复摘要损坏量为 Hausdorff维数。d≥2、φ(t)=tL(t) 为规范函数且 L 非增。Theorem1.1：若紧集 K 线上一致多孔（UPL）且 ∫₀¹dt/φ(t)=∞，则对每条可求长γ有 H^φ(K∩γ)=0；反之对任意至少含两点的连通紧 K，积分收敛时存在可求长γ使 H^φ(K∩γ)>0。Theorem1.2：任意紧UPL集与每条弦弧曲线交集的 Hausdorff维数<1，此项不需积分条件或K连通；任意非退化连通紧K及每个0<s<1均存在弦弧γ使 dim_H(K∩γ)>s（正文强于摘要的≥s）。UPL指存在η>0，每个非退化线段I中都有x使B(x,η|I|)避开K。

Let $K \subset\mathbb{R}^d$, $d\ge2$, be a connected compact set and $\phi(t)=tL(t)$ be a gauge function with $L$ non-increasing. We study intersections of $K$ with rectifiable curves and chord-arc curves. We show that if $\int_0^1\frac{dt}{\phi(t)}<\infty$, then there exists a rectifiable curve $\gamma\subset\mathbb{R}^d$ such that $\mathcal H^\phi(K \cap\gamma)>0$. Moreover, for every $0<s<1$, there exists a chord-arc curve $\gamma$ such that $\textrm{ this http URL }(K \cap\gamma)\ge s$. Conversely, we show that if $K$ is uniformly porous on lines and $\int_0^1\frac{dt}{\phi(t)}=\infty$, then $\mathcal H^\phi(K \cap\gamma)=0$ for every rectifiable curve $\gamma$ and $\textrm{ this http URL }(K \cap\gamma)<1$ for every chord-arc curve $\gamma$.

明确披露 AI 协作：Use of AI 明确 Theorems1.1与1.2的证明借助 Claude Fable5 获得，GPT-6.1Sol 润色语言与呈现。证明经作者核查和简化；未披露某个具体核心想法由模型提出，故记 proofs/writing，不自动添加 ideas 或把作者核查记为AI验证。

来源：https://arxiv.org/pdf/2610.41510v1 · PDF 第 15 页 Use of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。Use of AI 明确 Theorems1.1与1.2的证明借助 Claude Fable5 获得，GPT-6.1Sol 润色语言与呈现。证明经作者核查和简化；未披露某个具体核心想法由模型提出，故记 proofs/writing，不自动添加 ideas 或把作者核查记为AI验证。

来源：https://arxiv.org/pdf/2610.41510v1

[arXiv](https://arxiv.org/abs/2610.41510)

## The twistor construction of toric gravitational instantons

Maciej Dunajski、Lionel Mason、Paul Tod

论文以对称实有理2×2粘接矩阵P(w)编码具有有限节点的toric引力瞬子：P有实轴简单极点、det P=−1并满足ALE或ALF规定渐近。Theorem 1.1及ALE对应定理递归产生全部这类矩阵，再通过Riemann–Hilbert全纯分裂、Gram矩阵和横向共形因子公式重建Ricci平坦度量。此为包含奇性数据的代数构造；成为光滑完整瞬子仍需检验正定性、全局周期格、轴锥缺陷及节点orbifold条件。三节点情形细分为GH、ALE Plebański–Demiański及ALF Chen–Teo类及实解析延拓；§7五节点新ALF例明确只是计算机辅助候选。

We give an explicit construction of all ALF and ALE toric gravitational instantons in terms of certain rational matrix functions of one complex variable on the Riemann sphere; these provide patching matrices for their corresponding twistor holomorphic vector bundles. The reconstruction of the instantons arises from the solution to a Riemann--Hilbert splitting problem and we show how this can be solved via linear algebra, resembling but not equivalent to the Belinski--Zakharov ansatz. This construction gives a complete classification together with an explicit form for all toric gravitational instantons up to the resolutions of conical and orbifold singularities. We illustrate the formalism by computer--assisted numerical construction of two new ALF (but not AF) gravitational instantons with five nodes.

明确披露 AI 协作：第6页作者明确披露：§7五节点ALF瞬子的构造得到Claude Opus 5.5（Anthropic）的协助，并提供相关Maple与Python资料；ChatGPT Pro还用于检查及建议改进其他部分。按数值构造与检查记录计算、核验用途；未将具体核心思想归因AI，故不据此标记ideas。

来源：https://arxiv.org/pdf/2610.41867v1 · PDF 第6页，§2之前的工具使用说明

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第6页作者明确披露：§7五节点ALF瞬子的构造得到Claude Opus 5.5（Anthropic）的协助，并提供相关Maple与Python资料；ChatGPT Pro还用于检查及建议改进其他部分。按数值构造与检查记录计算、核验用途；未将具体核心思想归因AI，故不据此标记ideas。

来源：https://arxiv.org/pdf/2610.41867v1

[arXiv](https://arxiv.org/abs/2610.41867)

## On the Geroch conjecture for toric gravitational instantons

Lars Andersson、Mattias Dahl、Gustav Nilsson

Theorem 1/10.1适用于光滑、单连通、完整非紧的四维toric引力瞬子：Ricci平坦、二次曲率衰减（定义亦以有限曲率能量表述）、有效T²作用且每点稳定子连通、固定点有限并至少一个。作者证明端为ALE、ALF±或AFβ，并由对应平坦种子经有限实轴极点的Belinski–Zakharov变换生成，给出Hankel行列式闭式度量。此是全局有限极点生成定理；第3页明确不主张它蕴涵原Geroch猜想，因为未把所用操作识别为Riemannian Geroch群元素。

Geroch conjectured that the local solutions of the vacuum Einstein equations with two commuting Killing fields and vanishing twist constants are generated from flat space by an infinite-dimensional group of transformations, and Hauser and Ernst proved this for stationary axisymmetric spacetimes near the axis. The solutions generated from flat space by the transformations with finitely many poles in the spectral parameter are the solitons of Belinski and Zakharov. We prove a solitonic form of the conjecture in Riemannian signature, for toric gravitational instantons. The proof combines Weinstein's uniqueness argument, a closed formula for the soliton metrics in Hankel determinants and a degree argument. It also applies to the toric Ricci-flat metrics with conical singularities constructed by Li and Sun.

明确披露 AI 协作：第83页独立声明作者通过Claude Code使用Claude，参与论证发展与写作、编写运行核验脚本和搜索例子、查阅文献及审查草稿。文中列出的三项先计算发现后证明的事实并未逐一明确归因AI；第3、70页还将插值行列式分解的关键观察归于S. Aksteiner，因此不把这一路线或全部核心思想算给AI。

来源：https://arxiv.org/pdf/2610.41875v1 · PDF 第83页，“Computation and the use of an AI assistant”

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第83页独立声明作者通过Claude Code使用Claude，参与论证发展与写作、编写运行核验脚本和搜索例子、查阅文献及审查草稿。文中列出的三项先计算发现后证明的事实并未逐一明确归因AI；第3、70页还将插值行列式分解的关键观察归于S. Aksteiner，因此不把这一路线或全部核心思想算给AI。

来源：https://arxiv.org/pdf/2610.41875v1

[arXiv](https://arxiv.org/abs/2610.41875)

## Optimal Average Distortion for Non-Expansive Embeddings of Euclidean Metrics into the Line: With applications to cut-matching games and vertex expansion

Jack Spalding-Jamieson

证明任意 n 点 Euclid 度量可非扩张地映到直线，平均畸变至多为 O(√(log n/log log n))，与已知下界匹配。由此给无向 cut-matching game 的 cut-player 一个谱保证最优的策略，并改进高次图的顶点扩张谱近似。

We show that any $n$-point Euclidean metric admits a non-expansive embedding into the line with average distortion at most $O\left(\sqrt{\frac{\log n}{\log\log n}}\right)$, matching a known lower bound. We also present two applications of this result. First, we give a cut-player strategy with an optimal spectral guarantee for the undirected cut-matching game. Second, we give an improved spectral approximation for vertex expansion in high-degree graphs.

明确披露 AI 协作：第1页AI Disclosure直接把本项工作的关键技术思想归因GPT-6 Astra，并把部分简化归因Claude Opus 5.5，明确说呈现文字由作者自行完成。此为关键技术思想的正面归因，支持ideas及技术论证简化；声明没有逐项说明第3页随机投影、匹配和最优输运对偶路线中哪些步骤来自哪个模型，不能扩大成全部正文由AI撰写。

来源：https://arxiv.org/pdf/2610.41945v1 · PDF 第1页，摘要之后“AI Disclosure”；第3页证明路线用于理解声明对象

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第1页AI Disclosure直接把本项工作的关键技术思想归因GPT-6 Astra，并把部分简化归因Claude Opus 5.5，明确说呈现文字由作者自行完成。此为关键技术思想的正面归因，支持ideas及技术论证简化；声明没有逐项说明第3页随机投影、匹配和最优输运对偶路线中哪些步骤来自哪个模型，不能扩大成全部正文由AI撰写。

来源：https://arxiv.org/pdf/2610.41945v1

[arXiv](https://arxiv.org/abs/2610.41945)

## The metric Zariski multiplicity conjecture in dimension 4

José Edson Sampaio

对约化全纯函数芽 f、g，若环境 bi-Lipschitz 同胚将 V(f) 映到 V(g)，且 V(f) 切锥的每个不可约分支之奇异集复维至多二，则原点重数相同。特别，环境 Cⁿ 中 n≤4 的复解析超曲面重数为嵌入 bi-Lipschitz 不变量；另对奇异集维数至多二的不可约齐次超曲面证明环境拓扑等价保持次数。

Recently, OpenAI announced a counterexample to the Zariski multiplicity conjecture in dimension 4. Here, we prove that the metric Zariski multiplicity conjecture is true in dimension 4. More precisely, let $f,g\colon(\mathbb{C}^n,0)\to(\mathbb{C},0)$ be germs of reduced holomorphic functions, and let $\varphi\colon(\mathbb{C}^n,0)\to(\mathbb{C}^n,0)$ be a bi-Lipschitz homeomorphism such that $\varphi(V(f))=V(g)$. We prove that if every irreducible component of the tangent cone of $V(f)$ at the origin has a singular locus of dimension at most two, then $V(f)$ and $V(g)$ have the same multiplicity at the origin. In particular, the multiplicity of complex analytic hypersurface singularities in $\mathbb{C}^n$, $n\leq 4$, is an embedded bi-Lipschitz invariant; the cases $n=2$ and $n=3$ were known. This extends a previous result of the author for tangent cones whose components have singular loci of dimension at most one. We also prove that two irreducible homogeneous hypersurfaces whose singular loci have dimension at most two, and which are mapped onto each other by a homeomorphism of $\mathbb{C}^n$ fixing the origin, have the same degree.

明确披露 AI 协作：第23页致谢明确披露作者用Claude及Gemini精炼论证、定位参考文献并起草和修改稿件，且称已独立核验AI建议。第1—2、25页OpenAI则是他人Zariski反例工作及其引用，不能作为本作者使用OpenAI或让AI提出核心思想的证据；正面判定依据是第23页自己的使用声明。

来源：https://arxiv.org/pdf/2610.41954v1 · PDF 第23页，References之前Acknowledgments；第1—2、25页为外部工作背景

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第23页致谢明确披露作者用Claude及Gemini精炼论证、定位参考文献并起草和修改稿件，且称已独立核验AI建议。第1—2、25页OpenAI则是他人Zariski反例工作及其引用，不能作为本作者使用OpenAI或让AI提出核心思想的证据；正面判定依据是第23页自己的使用声明。

来源：https://arxiv.org/pdf/2610.41954v1

[arXiv](https://arxiv.org/abs/2610.41954)

## Rationally slice knots that are not biprojectively H-slice

Elise Brod

构造有理 slice 但非 biprojectively H-slice 的无限结族，从8₁₈开始，回答有理结 concordance 中的相关问题。主要工具是对 signature 为零的结在多重 CP² 连通和中 H-sliceness 的格嵌入障碍；还处理既有 instanton 不变量 r₀ 未排除的2-bridge族、非交错 Montesinos 族及拓扑但非光滑 BPH-slice 的素交错结。

We show that rationally slice knots need not be biprojectively H-slice (BPH-slice), answering a question in the study of the rational knot concordance group. Our main tool is a lattice embedding obstruction to H-sliceness in $\#^n\mathbb{CP}^2$ for knots with vanishing signature, extending work of Kjuchukova--Miller--Ray--Sakallı. We apply the obstruction to an infinite family of rationally slice knots, beginning with $8_{18}$. As additional applications, we obstruct the BPH-sliceness of a family of 2-bridge knots which is not obstructed by the instanton knot concordance invariant $r_0$, we obstruct a non-alternating family of Montesinos knots, and we give prime alternating knots that are topologically but not smoothly biprojectively H-slice. We discuss why these knots remain plausible candidates for detecting exotic smooth structures on $\#^n\mathbb{CP}^2$ and suggest natural sources of further candidates.

明确披露 AI 协作：第5页§1.7明确披露Claude和ChatGPT Work用于文献查询、校对、Theorem B.4计算核查、§7数据库筛选及例子搜索核验、按已有公式计算2-bridge结的instanton不变量r0，以及手绘转TikZ。第40页[Sta26]由Claude生成的另一计算属于他人工作，不把它当本作者核心思想或本论文证明来源。

来源：https://arxiv.org/pdf/2610.41996v1 · PDF 第5页§1.7 AI Disclosure；第40页外部计算引用

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第5页§1.7明确披露Claude和ChatGPT Work用于文献查询、校对、Theorem B.4计算核查、§7数据库筛选及例子搜索核验、按已有公式计算2-bridge结的instanton不变量r0，以及手绘转TikZ。第40页[Sta26]由Claude生成的另一计算属于他人工作，不把它当本作者核心思想或本论文证明来源。

来源：https://arxiv.org/pdf/2610.41996v1

[arXiv](https://arxiv.org/abs/2610.41996)

## Spectral Beurling-Selberg Approximation and Applications to Effective Motivic Chebotarev-Sato-Tate Estimates

Yassine El Kaouni

在紧、连通 Riemann 流形上，对边界上 Minkowski content 有限的集合建立谱 Beurling–Selberg 上下逼近，控制谱系数并量化 Hausdorff 扰动稳定性，常数在共同边界 content 界的集合族上一致。扩展到具有 basic mean curvature 的 Riemannian submetry 所得奇异空间，并应用于 quaternionic Shimura 簇的等分布。

We establish a spectral Beurling-Selberg approximation theorem on compact connected Riemannian manifolds for sets whose boundaries have finite upper Minkowski content. Our majorants and minorants have controlled spectral coefficients and explicit stability under Hausdorff perturbations, uniformly over families satisfying a common Minkowski content bound. We extend the construction to singular spaces arising from Riemannian submetries with basic mean curvature, and apply it to equidistribution on quaternionic Shimura varieties. Assuming the conjectural formalism of the specified motivic L-functions, including the motivic Riemann hypothesis, we develop effective Chebotarev-Sato-Tate estimates for fixed sets and varying families with controlled boundary geometry and Hausdorff variation, and describe how additional symmetries improve the error exponents. The proofs combine classical analytic methods with new methods from differential geometry, analytic geometry, and Riemannian spectral analysis. Applications include an asymptotic formula for a motivic analogue of Atkin-Serre estimates and tubular estimates for Picard-rank jumps of K3 surfaces via their transcendental motives.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文关键词及断行模型名补检唯一相关命中在第67页，内容是询问能否将OpenAI他人的准Riemann假设工作推广到自守情形，不是作者自身使用AI的声明。已检查第17页完整致谢：感谢家人、导师、学者与资助机构，无自身AI工具使用披露。6个短提取页均渲染确认为实际空白页，原shortTextPages保留。这里只能认定所审PDF未见作者自身使用披露，不能推断未使用AI。另逐页查看文本过短页面的渲染图，确认仅为空白页或章节扉页。

来源：https://arxiv.org/pdf/2610.42022v1

[arXiv](https://arxiv.org/abs/2610.42022)

## Constructing Lagrangian surfaces in all symplectic toric $4$-manifolds from multi-grid diagrams

Shintaro Fushida-Hardy、Laura Wakelin

用 multi-grid diagrams 在所有辛 toric 四维流形中构造 Lagrangian 曲面，将 CP² 中的 triple-grid 方法从 trisection 推广到 toric decomposition。给出多类背景中的例子，包括 Evans 近期在 S²×S² 中不可挤压 Klein 瓶的图示。

We present a new diagrammatic construction of Lagrangian surfaces in all symplectic toric $4$-manifolds from objects called multi-grid diagrams. These are a generalisation of triple grid diagrams for Lagrangian surfaces in $\mathbb{CP}^2$ wherein the underlying trisection is replaced by the more general notion of a toric decomposition. We give examples of multi-grid diagrams for Lagrangian surfaces in a range of symplectic toric $4$-manifolds, including Evans' recent non-squeezable Klein bottle in $S^2 \times S^2$.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第3页AI declaration明确写作者没有为本篇数学或写作使用AI。该命中是否定声明，不能记作作者使用AI；全篇补检无其他正面自身使用证据。状态表示所审版本未见正面披露，保留作者声明的具体否定范围。

来源：https://arxiv.org/pdf/2610.42076v1

[arXiv](https://arxiv.org/abs/2610.42076)

## Polynomial-Time Algorithms for Links

Thiago de Paiva、Yi Liu

给定有符号 Artin 辫词及股数，显式多项式时间算法将其转换为 generalized T-link 参数；结合 Yamada–Vogel braiding，可从任意定向组合链环图进行转换，并控制所得股数与交叉数的多项式增长。由此在对应辫图总股数及交叉数作为参数输入规模时，图表示和该参数表示之间的性质判定、不变量计算及指定精度近似具有多项式时间可迁移性。

Every link in the \(3\)-sphere admits a generalised \(T\)-link presentation. In this paper, we give an explicit polynomial-time algorithm which, given a signed Artin braid word and the number of strands, computes such a presentation. Combining this construction with Yamada--Vogel braiding gives a polynomial-time conversion from arbitrary oriented combinatorial link diagrams to generalised \(T\)-link parameters. We prove polynomial bounds on the number of strands and crossings in the resulting braid. As an application, we prove that a link property or a link invariant is computable in polynomial time from diagrams if and only if the corresponding problem is solvable in polynomial time from generalised \(T\)-link parameters, with parameter input measured by the total number of strands and crossings in the corresponding braid diagram. Whenever a classification criterion or an explicit invariant formula is available in these parameters, it can be applied to the original link by substituting the parameters obtained from the diagram. A polynomial-time test or evaluation then gives a polynomial-time procedure on diagrams. We also establish the corresponding transfer for approximating real-valued invariants to prescribed accuracy.

明确披露 AI 协作：第29页明确披露大语言模型协助代数计算、显式参数变换、中间步骤组织核查、构造及其证明的改进、时间/存储/表示大小界核验、计算检验准备与稿件起草修改。相同声明明确研究问题、主要思想及一般方法由作者提出，故标写作、论证、核验及计算，不标ideas，也不臆定模型品牌。

来源：https://arxiv.org/pdf/2610.42077v1 · PDF 第29页，“Acknowledgements and use of AI tools”

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第29页明确披露大语言模型协助代数计算、显式参数变换、中间步骤组织核查、构造及其证明的改进、时间/存储/表示大小界核验、计算检验准备与稿件起草修改。相同声明明确研究问题、主要思想及一般方法由作者提出，故标写作、论证、核验及计算，不标ideas，也不臆定模型品牌。

来源：https://arxiv.org/pdf/2610.42077v1

[arXiv](https://arxiv.org/abs/2610.42077)

## Holonomies of hyperbolic surfaces with one branch point

Bertrand Deroin、Nicolas Tholozan

对亏格 g≥2 的闭定向曲面 S，证明 Euler 类为3−2g 的任意 π₁(S)→PSL(2,R) 表示，都可实现为 S 上一个简单分支点的双曲度量 holonomy。

Let $S$ be a closed oriented surface of genus $g\geq 2$. We prove that any representation of $\pi_1(S)$ into $\mathrm{PSL}(2,\mathbb{R})$ with Euler class $3-2g$ is the holonomy of a hyperbolic metric on $S$ with one simple branch point.

明确披露 AI 协作：第4页Tool Use明确称OpenAI Astra帮助绘制插图并修正语法、笔误；同时声明原始数学思想由作者提出且早于近期AI进展。按稿件呈现与校对记writing，不把绘图或语言修订扩大成数学核心思想或证明贡献。

来源：https://arxiv.org/pdf/2610.42079v1 · PDF 第4页，Acknowledgements之后Tool Use

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第4页Tool Use明确称OpenAI Astra帮助绘制插图并修正语法、笔误；同时声明原始数学思想由作者提出且早于近期AI进展。按稿件呈现与校对记writing，不把绘图或语言修订扩大成数学核心思想或证明贡献。

来源：https://arxiv.org/pdf/2610.42079v1

[arXiv](https://arxiv.org/abs/2610.42079)

## Mean curvature bounds for CMC foliations of manifolds with sectional curvature bounded below

José Edson Sampaio、Euripedes Carvalho da Silva

Theorem A考虑完备连通M^(n+1)、n≥1、sec_M≥−K0（K0≥0）及由连通超曲面组成的光滑余维一CMC叶状结构，叶间常数可变。作者使用平均主曲率惯例div N=−nH，证明每叶|H|≤(n+1)√K0；横向不可定向情形通过至多二重Riemann覆盖处理。因而非负截面曲率时全部叶极小；|sec|≤1时得到n+1的维数界，回答Meeks–Pérez–Ros关于存在某个维数常数的猜想。

Let $M^{n+1}$ be a complete Riemannian manifold with $\sec_M\ge-K_0$, $K_0\ge0$, and let $\mathfrak{F}$ be a codimension one foliation of $M$ by hypersurfaces of constant mean curvature, the constant depending on the leaf. We prove that the mean curvature of every leaf satisfies $|H|\le(n+1)\sqrt{K_0}$. In particular, the mean curvature of the leaves of a CMC foliation of a complete manifold with $|\sec_M|\le1$ is bounded by $n+1$, which answers positively a conjecture of Meeks III, Pérez, and Ros.

明确披露 AI 协作：第35页致谢明确披露Claude、Gemini及ChatGPT用于精炼论证、定位参考文献及起草修改稿件，并声明作者独立核验所有AI建议。精炼论证支持proofs用途，但未将具体新构造或核心路线归因AI，不记ideas。

来源：https://arxiv.org/pdf/2610.42093v1 · PDF 第35页，References之前Acknowledgments

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第35页致谢明确披露Claude、Gemini及ChatGPT用于精炼论证、定位参考文献及起草修改稿件，并声明作者独立核验所有AI建议。精炼论证支持proofs用途，但未将具体新构造或核心路线归因AI，不记ideas。

来源：https://arxiv.org/pdf/2610.42093v1

[arXiv](https://arxiv.org/abs/2610.42093)
