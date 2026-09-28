# 几何前沿日报 · 2026-09-28

已收录 42/42 · 解读 42/42 · 资料待补齐。

## The maximum area of the convex hull of a polyhex

Pragyaan Gaur

确定 n 个正六边形组成的连通 polyhex 的凸包最大面积，给出每个 n 的达界构造；新上界在 n 被 3 整除时严格改进 Kurz 的旧猜想。

A polyhex is an edge-connected set of n cells of the regular hexagonal tiling, where each cell has area one. We prove that the convex hull of a polyhex has area at most (1/6)*ceiling(n^2 + 14n/3), and we show that some polyhex reaches this bound for every n. This proves a conjecture of Kurz from 2008, which asked for the weaker bound (1/6)*floor(n^2 + 14n/3 + 1). The two bounds differ exactly when 3 divides n. We checked the upper bound in the Lean 4 proof assistant with the Mathlib library. We also report a computation over all polyhexes with at most 12 cells, which shows that for these sizes only one shape reaches the maximum, up to rotation and reflection.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30310)

## Planar Contact Structures with Calabi-Yau Fillings and Topological Quantum Computation

Atsuhide Mori

研究分支覆盖构造的平面开书与 Stein 填充，给出 Calabi–Yau 条件、正分解长度和填充拓扑的约束，并联系 Ising 量子操作及子开书的张量结构。

We study planar open books obtained by lifting braids through branched covers of the disk D^2, together with the quantum operations in the Ising representation. We note a criterion for the associated Stein fillings to be Calabi-Yau (CY). Among positive factorizations of a fixed monodromy, every CY factorization has minimal length, and its filling minimizes \chi and b_2. An application to Baykur's recent examples gives one planar contact 3-manifold with infinitely many non-homeomorphic CY fillings. The cover there is of degree \ge 6. At degree 4 a single CY filling forces every filling to be CY, and the filling is unique in a certain case; at degree \le 3 the filling is unique and is CY under a mild condition. Admissible cuts of the covering disk decompose the openbook into subopenbooks. Every positive factorization then localizes to the pieces, and the CY condition holds exactly when it holds locally. This makes the state space a direct sum of tensor products indexed by the compatible parity choices with at most two qubits in each factor when the pieces have degree \le 4, which is also the range in which the CY condition depends only on the monodromy. For a particular degree 4 cover, the points, lines and flags of the two-qubit doily are realized by the system of its subopenbooks. Fifteen liftable braids there share the same quantum operation and the same Stein filling, and are separated only by which subopenbook systems they admit. A choice of tensor-product structure is thus carried by the lift and not by the braid group representation, which suggests a link between contact topology and quantum entanglement.

明确披露 AI 协作：官方评论明确披露使用 ChatGPT 和 Claude 进行文献检索与核验、初等计算检查和数学讨论；不能据此认定模型提供核心证明。

来源：https://arxiv.org/list/math.GT/new · 该论文官方 Comments



[arXiv](https://arxiv.org/abs/2609.30406)

## Area stability of plank covers

Egor Bakaev、Amir Yehudayoff

证明从平面圆盘挖去足够小的同心圆盘后，覆盖剩余圆环的有限板条族可以重排覆盖整个圆盘，并获得适用于平面对称凸体的重叠面积估计。

We prove a conjecture of András Bezdek on the stability of plank covers of the planar disk $D$. Namely, we show that if a sufficiently small concentric disk $rD$ is removed from $D$, then every finite family of planks covering the resulting annulus can be re-arranged to cover the whole disk. For the proof, we show a strong stability result for a related covering problem. If the hole has area $a \geq 0$ then the total overlap is $\geq c a/r$ where $c>0$ is a constant. This overlap estimate is not specific to the disk and is applicable to all planar symmetric convex bodies. We develop two new ingredients: a pruning procedure and a flattening mechanism.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30409)

## On the completeness of gravitational pp-wave spacetimes: A counterexample to the {Ehlers--Kundt} conjecture

Hannah Cairo

作者声明构造 Ehlers–Kundt 猜想的反例，并证明引力 pp-wave 中测地完备性在 Baire 范畴意义下是泛性的；还构造测地完备的通用 pp-wave。

This paper concerns the geometry of gravitational pp-wave spacetimes. We give a counterexample to the Ehlers--Kundt conjecture. In fact, we show that geodesic completeness is generic, in the sense of Baire category, among gravitational pp-waves. We also define a concept of ``universal pp-wave'', i.e. a pp-wave whose metric approximates that of every other gravitational pp-wave arbitrarily closely on arbitrarily large compact sets, and we show that there are geodesically complete universal pp-waves. Our machinery also suffices to give a new proof of the polynomial case of the Ehlers--Kundt conjecture (previously proved by Flores and Sánchez).

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30419)

## A Concordance Invariant For Knots from $CFK^\infty$

Kashti Satish Umare

从结 Floer 复形构造三变量分段线性的 beta 不变量，证明次可加性，分离两族 Teragaito 结生成的正锥，并在正 L-space 结中恢复 Alexander 多项式。

We construct a multi-filtered smooth knot concordance invariant, $\beta(t^1, a, t^2)$, derived from the knot Floer complex $CFK^\infty$. $\beta$ is a three-variable piecewise linear function defined on $(0,2) \times \mathbb{R} \times (0,2)$. We demonstrate that $\beta$ satisfies a subadditivity relation. We apply $\beta$ to prove concordance results for a certain family of L-space knots. We show that the positive cones spanned by Teragaito's knots $K_{1,n}$ and $K_{2,n}$ are disjoint in the smooth concordance group $\mathcal{C}$. For positive L-space knots, we show $\beta$ completely determines the Alexander polynomial and distinguishes knots with identical $\Upsilon$ invariants.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30425)

## A non-lattice periodic point set beating the optimal lattice packing-covering constant in dimension five

Sven Ahrend、Mathieu Dutour Sikirić

在五维构造二周期非格点集，使覆盖半径与堆积半径之比为 9/√40，严格小于五维最优格的对应常数。

The packing-covering constant of a point set $X\subseteq\mathbb{R}^d$ is $\gamma(X)=\mu(X)/\rho(X)$, the covering radius divided by the packing radius. Among lattices, its minimum $\gamma_d$ is known for $d\leq 5$, attained by $\mathsf{A}_2^*$, $\mathsf{A}_3^*$, and Horváth's lattices $\mathsf{Ho}_4$, $\mathsf{Ho}_5$; Böröczky proved that $\gamma_3$ is optimal without the lattice restriction, but for $d=4,5$ the non-lattice problem was open. We exhibit a $2$-periodic non-lattice point set of $\mathbb{R}^5$ with $\gamma = 9/\sqrt{40} = 1.423024\ldots < \gamma_5 = \sqrt{3/2+\sqrt{13}/6} = 1.4494568\ldots$, so that in dimension five the packing-covering problem is not solved by lattices.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30513)

## Positive Weighted Curvatures on Compact Manifolds with Weighted Convex Boundary and Proper Manifolds

Ruifeng Xu

在带正密度的黎曼流形上，以加权截面曲率、中间 Ricci 曲率及边界第二基本形式控制拓扑，得到球或 CW 复形的分类结论及加权 Frankel 定理。

Given a Riemannian manifold $(M,g)$ equipped with a positive density function $f = e^{-\varphi}$, we study the weighted sectional curvature $\overline{\sec}_\varphi(U,V)$ and the $k$-th intermediate weighted Ricci curvature $\overline{\text{Ric}}_{k,\varphi}(U,V)$. We show that $\overline{\sec}_\varphi(U,V)$ and $\overline{\text{Ric}}_{k,\varphi}(U,V)$, together with the weighted second fundamental form $\widetilde{\mathrm{I\!I}}$, play central roles in controlling the topology of the manifold. Using the theory of $\widetilde{C}(k)$ functions, variational methods, and Morse theory, we prove that by imposing suitable restrictions on these quantities, an $n$-dimensional compact manifold with boundary or a proper open $n$-dimensional manifold is diffeomorphic to an $n$-ball or to a certain CW complex. This shows that such rigidity phenomena is not confined in the unweighted case, but persist in the weighted setting as well. Lastly, we prove a weighted analogue of Frankel's Theorem under positive intermediate weighted Ricci curvature. These results extend classical theorems from the unweighted setting to the weighted case, demonstrating that $\overline{\sec}_\varphi(U,V)$ and $\overline{\text{Ric}}_{k,\varphi}(U,V)$ provide effective tools in Riemannian geometry.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30527)

## Short homology bases for translation surfaces

Peter Buser、Achintya Dey、Eran Makover、Bjoern Muetzel

在面积归一化为 4πg 的闭平移曲面上构造线性比例数量的同调独立短闭曲线，其长度为对数级；另给出依赖最短鞍连接的完整同调基。

Let $S$ be a closed translation surface of genus $g\ge 2$ with $\mathop{area}(S)= 4\pi g$. We show that for any $\lambda \in (0, 1)$ there exist $\lfloor \lambda \cdot g\rfloor$ homologically independent simple closed curves of length at most $ C(\lambda) \cdot \log(g)$, where $C(\lambda)$ is a constant that depends only on $\lambda$. This result is obtained from a mixed graph construction based on a Voronoi graph of the surface with the cone points as seeds and its dual graph. We also give a complementary result using only the Voronoi graph that produces $2g$ short loops that form a homology basis. This construction, however, depends on the length of a shortest saddle connection of the surface $S$.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30561)

## Uniformly Lipschitz Hyperbolic Group Actions on $\ell^p$

Chris Gartland、Tianyi Zheng

以双曲群边界的共形维数 Q 控制可用的 p，构造到 l^p 的适当一致 Lipschitz 仿射作用，并取得 1/p 的压缩指数。

Let $\Gamma$ be a finitely generated hyperbolic group, and let $Q$ denote the conformal dimension of its Gromov boundary $\partial\Gamma$. We prove that for every $p < \frac{Q}{Q-1}$, the group $\Gamma$ admits a proper uniformly Lipschitz affine action on $\ell^p$ with compression exponent $1/p$. The $\ell^p$-space hosting the action is designed from a Markov chain on a specialized hyperbolic filling of $\partial\Gamma$.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30583)

## Topological components of surface group representations into the unitary group

Xueyuan Wan

对边界 holonomy 不含特征值 1 的曲面群 U(p) 表示，以平坦 Hermitian 丛的符号数分类连通分支，并给出有边界曲面的分支数及裤子曲面的同伦类型。

We study representations of compact oriented surface groups into $\mathrm U(p)$ with elliptic-unipotent boundary holonomies, meaning that no boundary holonomy has eigenvalue $1$. We prove that the signature of the associated flat Hermitian bundle completely determines the connected component, and that every component is path-connected. For genus $g\geq1$ and $n\geq1$ boundary components, there are $np-1$ components; for $g=0$ and $n\geq2$, there are $(n-2)p+1$. The disk case is empty, while the closed-surface representation spaces are connected. The same component classification holds after taking the quotient by conjugation. Our proofs use the boundary rho invariant and explicit matrix deformations. For a three-holed sphere, the representation components have the homotopy types of complex Grassmannians, and their conjugation quotients are contractible.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30603)

## Positive scalar curvature on products of noncompact manifolds

Lizhi Chen、Kuntao Jin、Milan Jovanovic

证明任意三个连通无边界非紧光滑流形的乘积都承认完备且一致正标量曲率度量；同时给出两个开放流形乘积不承认完备非负标量曲率的例子。

We prove that the product of three connected noncompact smooth manifolds without boundary admits a complete metric of uniformly positive scalar curvature. The proof uses the additivity of Morse indices on products and an orientation-free version of Das's open Morse--surgery construction. We also give an example of two open manifolds whose product admits no complete metric of nonnegative scalar curvature.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30685)

## The second gap for self-shrinkers with constant norm of the second fundamental form

Pengpeng Cheng、Tongzhu Li

对第二基本形式平方范数 S 为常数的完备欧氏自收缩超曲面，证明 S≤10/7 时仅能取 0 或 1，因而得到平面、圆球及标准圆柱分类。

Let $X: M^{n}\to \mathbb{R}^{n+1}$ be a complete self-shrinker with constant squared norm of the second fundamental form $S$. In this paper, we prove that if $S\leq \frac{10}{7}$, then $S=1$ or $S=0$, and the self-shrinker is isometric to either a round sphere $\mathbb{S}^n(\sqrt{n})$ with the center at the origin, or a cylinder $\mathbb{S}^k(\sqrt{k})\times \mathbb{R}^{n-k},~~1\leq k\leq n-1$, or a plane through the origin.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30697)

## Coarse geometry of metric measure spaces

Takayuki Okuda、Takashi Shioya

定义测度粗等价和大尺度 doubling 空间的加权 l∞ 同调，证明其在测度粗等价下不变，并以零次同调消失刻画加权非 amenability。

Using ideas from optimal transport theory, we introduce a notion of measured coarse equivalence for metric measure spaces and define a corresponding variant of the uniformly finite homology of Block and Weinberger, called weighted $\ell^\infty$ homology, for large-scale doubling metric measure spaces. We prove that this homology is invariant under measured coarse equivalence and that the vanishing of its zeroth homology is equivalent to weighted non-amenability. The proofs combine techniques from optimal transport theory and the disintegration of measures.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30700)

## Energy convexity and uniformity of the $H$-surface flow in $\mathbb{R}^{3}$ with Dirichlet boundary condition

Da Rong Cheng、Longzhi Lin、Xin Zhou

在固定 Dirichlet 边界的小能量映射类中证明规定均值曲率能量的凸性，并沿 H 曲面热流获得类似估计，推出弱初值的一致收敛和极限唯一性。

We prove that the energy functional associated with surfaces of prescribed mean curvature in $\mathbb{R}^3$ exhibits a convexity property when restricted to maps from the unit $2$-disk having small Dirichlet energy and a fixed boundary value, provided that the $3$-form $H \cdot \text{vol}_{\mathbb{R}^3}$ has a primitive satisfying certain bounds. Under milder assumptions on $H:\mathbb{R}^3 \to \mathbb{R}$, we show that an analogous convexity estimate holds along the heat flow of the functional (the $H$-surface flow) when the initial Dirichlet energy is sufficiently small. This is done first for classical solutions, and then extended by approximation to weak solutions using a quantitative uniqueness result adapted from previous work on the harmonic map heat flow. As a consequence of the convexity estimate, we show that the $H$-surface flow with small-energy initial map of class $C^0 \cap W^{1, 2}$ on the unit $2$-disk converges uniformly to a unique limit at infinite time, which solves the corresponding stationary problem (the $H$-surface system) with the same boundary value.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30740)

## Pfaffian Geometry and Indicial Singularities of Third-Order Linear ODEs

Víctor León、Bruno Scárdua

通过 Pfaff 与射影叶状结构研究三阶线性 ODE，在正则奇点情形建立 Fuchs 适配模型，使指标多项式出现在特殊纤维奇点概形中。

We study third-order linear differential equations through their associated Pfaffian and projective foliations. In the regular-singular setting, we introduce a Fuchs-adapted Pfaffian model in which the indicial polynomial appears directly in the special-fiber singular scheme, and Frobenius resonance acquires a projective geometric interpretation.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30748)

## Einstein four-manifolds of positive sectional curvature and ADM mass

Matthew Gursky、Andrea Malchiodi

证明闭 Einstein 四流形在正截面曲率及 2χ−3|τ|≤4 条件下，必定在尺度意义下等距于圆四球或带 Fubini–Study 度量的复射影平面。

We prove that closed Einstein four-manifolds $(M,g)$ with positive sectional curvature and Euler characteristic and signature satisfying $2\chi(M)-3|\tau(M)|\le4$ must be homothetically isometric to the round $S^4$ or to $\mathbb{CP}^2$ with the Fubini-Study metric. The proof relies on an upper bound on the ADM mass of conformal blow-ups of $(M,g)$, combined with a lower one from \cite{GM}.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30803)

## Geometric Dissipation Structures and the Koszul Form

Prosper Rosaire Mama Assandje、Frédéric Barbaresco、Romain Nimpa Pefoukeu、Michel Bertrand Djiadeu Ngaha、Nozah Mba Frankel

在上半平面和 Lie 群热力学框架中，用 Koszul 一形式描述横截保守叶的耗散流，并讨论 para-Kähler 空间的 Berezin 量子化与双 Lagrangian 极化。

This paper investigates the canonical Koszul one-form at the interface of Jean Marie Souriau's Lie group thermodynamics and Paulette Libermann's symplectically complete foliations to describe geometric dissipation. On the Poincaré half-plane $\mathbb{H}$ under $SL(2, \mathbb{R})$, the equivariant momentum map level sets form a regular Libermann foliation framing the conservative boundaries. The Koszul-derived dissipative vector field acts strictly transverse to these leaves, driving a metriplectic flow that breaks Noether conservation laws and generates entropy. Quantum wise, we develop Berezin quantization on para-Kähler symmetric spaces, where the Koszul potential acts as a weight determining state density via the Fisher Souriau metric, and formalize Kostant's geometric quantization using the real dual polarizations of a bi-Lagrangian web.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.30976)

## Non-homogeneous curvature flows in a hemisphere

Hongyi Sheng、Weimin Sheng、Jiazhuo Yang

研究带径向系数的 sigma_k 幂曲率流，在超临界及临界增长条件下证明长期存在、严格凸性保持及归一化径向图的光滑指数收敛。

Let S^{n+1}_{+} be the open hemisphere of the unit sphere S^{n+1} centred at o. We study the non-homogeneous curvature flow X_t=-f(r) sigma_k^{alpha} {nu} of smooth, closed, strictly convex hypersurfaces enclosing o, where r is the geodesic distance to o. We consider both the supercritical regime beta>1+k {alpha} and the critical regime beta=1+k{alpha}, where beta is the growth order of the profile at the origin, f(r) almost equals r^{beta} as r descends to 0. Under the structural condition that f^{1/(1+k{alpha})} is convex, we prove long-time existence and preservation of strict convexity. The normalized radial function converges smoothly and exponentially to a constant: to 1 and to R_{infty}>0, resp. in different two cases. Thus the normalized radial graphs become round, while the original hypersurfaces contract to o.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31023)

## On the transcendental Yau-Tian-Donaldson Conjecture

Antonio Trusiani

作者声明在自同构平凡的情形证明超越 Kähler 类的一致 Yau–Tian–Donaldson 猜想；通过特殊 Kähler Fujita 逼近联系一致 K 稳定与模型版本，并给出大上同调类的相关逼近。

We prove the (uniform) Yau-Tian-Donaldson Conjecture for transcendental Kähler classes in the case of trivial automorphisms. Indeed, we show the existence of Special Kähler Fujita Approximations of big cohomology classes associated to big test configurations, establishing the equivalence between the uniform $K$-stability and the strengthened version for models. More generally, we show that any big cohomology class on a compact Kähler manifold admits such Special Kähler Fujita Approximations: the volume and the analogue of the Riemann-Roch coefficient of the big class are both approximated by those of Kähler classes on higher compactifications.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31089)

## An elementary solution to the polarization problem

Gergely Ambrus

提炼并组合既有论证，给出强极化和线性极化问题的自包含初等证明。

By distilling and combining the ideas of previous arguments, we provide a self-contained and entirely elementary proof of the strong and linear polarization problems.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31124)

## KnottedGraph: Scalable knotted-graph topology for scientific and mathematical discovery

Hakan Akgün、Xianquan Yan、Kehan Liu、Zhaoyun Chen、Ching Hua Lee

提出保留图连通性及空间嵌入的 KnottedGraph 框架，生成图示与 PD 编码，以合并部分消解和优化顺序扩展 Yamada 多项式计算，并由计算数据和 LLM 辅助寻找公式。

Scientific data span heterogeneous structures, including coordinates, networks, surfaces, volumes and fields, yet their topology can be quantified within a common framework through graph connectivity, cycle structure, genus and spatial embedding. Graph- and homology-based summaries do not determine spatial embedding, while standard knot and link polynomials require extensions to accommodate branching graphs. Here, we introduce KnottedGraph, a computational framework that converts such scientific representations to knotted graphs that retain graph connectivity and spatial embedding together. It constructs projected diagrams and PD codes, enabling various topological analyses, including Yamada-polynomial evaluation for topological classification. For scalable exact evaluation, it combines partial resolutions that leave the same unresolved connections and optimizes their processing order; the resulting algorithm is verified against published topological invariants of knotted graphs with up to 500 crossings. This scalability enables us to introduce an LLM-assisted mathematical-discovery methodology, in which computational topological data generated across knotted-graph families are used to identify candidate closed-form formulas. With this approach, we identify analytical Yamada-polynomials for generic graph motif families exhibiting Abelian and non-Abelian word sequences. Together, these scalable capabilities make knotted-graph topology computationally accessible across scientific domains, enabling large-scale classification and introducing a route from topological data to LLM-assisted AI4Math discovery.

明确披露 AI 协作：摘要明确报告 LLM 辅助数学发现：以空间图拓扑计算数据识别候选闭式公式；公式发现与证明验证须分别评估。

来源：https://arxiv.org/list/math.GT/new · 该论文官方摘要



[arXiv](https://arxiv.org/abs/2609.31152)

## Hexagon decompositions and the Weil-Petersson metric

Marie Abadie

由零剪切坐标构造翻转图到 Teichmüller 厚部的显式拟等距，再用六边形图模型研究 Weil–Petersson 完备化，并取得宽度至多 √(g+n)log(g+n) 的估计。

We give an explicit quasi-isometry from the flip graph of triangulations $\mathscr{F}_{g,n}$ to the $\epsilon$-thick part of Teichmüller space equipped with the Teichmüller metric, by mapping each ideal triangulation to the hyperbolic surface whose shearing coordinates along that triangulation are all equal to zero. Extending this construction, we obtain a quasi-isometry $Q$ from the hexagon graph $\mathscr{H}_{g,n}$ to the augmented Teichmüller space $\overline{\operatorname{Teich}}_{g,n}$ equipped with the Weil-Petersson metric, and we estimate its width, that is, the Hausdorff distance between $Q(\mathscr{H}_{g,n})$ and $\overline{\operatorname{Teich}}_{g,n}$. By bounding the Weil-Petersson distance along grafting rays and the Teichmüller distance along shearing deformations, we show that the width is at most $\sqrt{g+n}\log(g+n)$. We also provide an explicit projection from any point in $\overline{\operatorname{Teich}}_{g,n}$ to the thick part of boundary strata, maintaining simultaneous control over the Weil-Petersson distance and the shearing coordinates.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31278)

## Topology and Dirichlet spectrum of free boundary minimal and CMC surfaces

Alcides de Carvalho、Roney Santos

在凸边界、非负 Ricci 的三流形中，对指数一自由边界极小曲面或稳定 CMC 曲面给出亏格和边界分支数界，条件包括 Jacobi 算子的首 Dirichlet 特征值非负。

We find bounds for the genus and for the number of boundary components of a surface that is either index one as a free boundary minimal surface or stable as a free boundary constant mean curvature surface in a Riemannian three-manifold with convex boundary and non-negative Ricci curvature, provided the first Dirichlet eigenvalue of its Jacobi operator is non-negative. As an application, we establish strong topological restrictions on such surfaces in compact strictly convex domains of three-dimensional normal homogeneous spaces.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31304)

## The number of touching pairs of congruent sphere packings in Euclidean 3-space

Cameron Strachan

证明最大接触数堆积的最小刚性，并求得 n=6至9 时 c(n)=3n−6；枚举部分小规模接触结构，另给出 FCC 格点问题的渐近式。

A packing of $n$ congruent balls in $\mathbb{R}^3$ is a family of interior-disjoint Euclidean balls all having the same radius. The contact number of a packing is the number of touching pairs of balls. In this paper we investigate the problem of determining the maximum contact number, $c(n)$, of a packing of $n$ congruent balls in $\mathbb{R}^3$. We first show that all packings of $n$ congruent balls that have a contact number of $c(n)$ are minimally rigid. Furthermore, we show that $c(n)=3n-6$ for $n=6,7,8,$ and $9$. These two results resolve a conjecture of K. Bezdek and Khan. During the proof of the latter result, we also enumerate the contact structures of all packings of $n$ congruent balls with contact number $c(n)$ for $n=6,7,$ and $8$. Additionally, we provide a lower bound construction which shows $c(n)> 6n-6\sqrt[3]{2}n^\frac{2}{3}$ when $n=16k^3-33k^2+24k-6$ where $k\in \mathbb{N}$. We also look at the restricted problem where each ball is centered on the face-centered cubic lattice $A_3$. In this case let $c_{A}(n)$ denote the maximum contact number. We show that $c_{A}(n)\leq 6n-\frac{6}{\sqrt[6]{2}}n^\frac{2}{3}$ for all $n$, and determine the asymptotics of $c_{A}(n)$ to be $c_{A}(n)=6n-(1+o(1))6\sqrt[3]{2}n^\frac{2}{3}$.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31331)

## The mean curvature blows up at nondegenerate neck pinch singularities of Lagrangian mean curvature flow

Jason D. Lotay、Goncalo Oliveira

证明 Lagrangian 曲面均值曲率流的每个非退化颈缩奇点处均曲率无界，并控制其爆破速度。

We prove that at any nondegenerate neck pinch singularity of Lagrangian mean curvature flow of surfaces the mean curvature becomes unbounded, with control on the blow-up rate.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31343)

## Bellman's Forest Problem and Computability

Jacob Canel

研究 Bellman 森林问题中的最短逃逸路径，证明每个实例都存在任意小的可计算扰动，使最短长度可计算，且有长度任意接近最优的均匀可计算逃逸路径。

The goal of this paper is to refine methods in computable analysis and to employ them in the study of solutions of an optimization problem posed by Bellman. This problem asks how to find optimal (shortest) paths which do not fit into given plane figures. We show that each instance of Bellman's problem has an arbitrarily small uniformly computable perturbation for which the minimal length of path is computable, and thus the class of optimal paths is a $\Pi_1^0$ class, and there are uniformly computable paths which escape with arbitrarily small length greater than the minimum possible.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31352)

## Semilinear Neumann boundary value problems for measure-valued maps

Aleksei Kroshnin、Hugo Lavenant、Dmitry Vorotnikov

研究带非齐次 Neumann 边界的非线性 Poisson 系统的 Wasserstein 提升，用测度值迹的矩估计证明极小解存在，并推导矩阵值无压 Euler 型最优条件；高维中构造提升问题与经典问题极小值不同的例子。

We study the Wasserstein lift of nonlinear Poisson systems with inhomogeneous Neumann boundary conditions. We establish the existence of minimizers using new estimates involving the $p$-moments of measure-valued traces. We also derive the optimality conditions, which turn out to be matrix-valued generalizations of pressureless Euler equations. While deterministic minimizers exist under suitable convexity assumptions and for one-dimensional source domains, we show that genuinely measure-valued minimizers arise in higher dimensions. In particular, we construct examples in which the lifted and classical variational problems have different minimum values, thereby precluding the solutions to the lifted problem from being deterministic, despite the absence of any a priori mechanism enforcing measure-valued behavior. To the best of our knowledge, this phenomenon is new in the nonlinear elliptic theory.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31353)

## Hamilton-Type Gradient Estimates for Porous Medium and Fast Diffusion Equations on Riemannian Manifolds for all exponents

Jun Sun、Jiaming Yang

在 Ricci 有下界的完备流形上，对每个 m>1 和 0<m<1 的有界正解给出 u 的适当幂的局部 Hamilton 型梯度估计，推出非负 Ricci 下一致有界正古解为常数。

We establish local Hamilton-type gradient estimates for positive $C^{2,1}$ solutions of $u_t=\Delta u^m$ on complete Riemannian manifolds whose Ricci curvature is bounded from below. For every fixed $m>1$ and every fixed $0<m<1$, there exist $\beta=\beta(m,n)>0$ and $C=C(m,n)>0$ such that a solution $0<u\leqslant A$ in $B_{2R}(x_0)\times(t_0-T,t_0]$ satisfies the following local gradient estimate \begin{equation*} \sup_{B_R(x_0)\times(t_0-T/2,t_0]}|\nabla u^\beta| \leqslant C A^\beta \left(\frac1R+\sqrt{k}+\frac{A^{(1-m)/2}}{\sqrt T}\right), \end{equation*} where $\mathrm{Ric}_M\geqslant-k$. The proof uses an intrinsic quantitative alternative to locate, around each prescribed positive point, a cylinder on which the solution has a controlled upper-to-lower ratio. A local gradient estimate on this cylinder is combined with a stopping argument. As a consequence, every uniformly bounded positive ancient solution on a connected complete manifold with nonnegative Ricci curvature is constant.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31373)

## Unbalancing unit vectors

Zilin Jiang、Jeck Lim、Skand Parvatikar

证明对欧氏 d 维空间中 n 个单位向量可选符号，使向量和范数至少达到 √(2n−d)，并刻画等号情形。

We show that for every $n$ unit vectors $v_1, \dots, v_n$ in the $d$-dimensional Euclidean space, there exist signs $\varepsilon_1, \dots, \varepsilon_n \in \{\pm 1\}$ such that $\lVert \varepsilon_1 v_1 + \dots + \varepsilon_n v_n \rVert \ge \sqrt{2n - d}$, and we characterize the equality cases.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31389)

## Hamilton's gradient estimates and Liouville theorems for $u_{t}=Δu^{m}+au\log u+bu$ on Riemannian manifolds

Jun Sun、Jiaming Yang

以 Nash–Moser 迭代和 Saloff–Coste Sobolev 不等式研究含 ulog u 与线性反应项的扩散方程，获得指定 m 范围内的正解梯度估计和常系数 Liouville 定理。

In this paper, we apply Nash-Moser iteration and Saloff-Coste's Sobolev inequalities to derive gradient estimates for positive solutions to a class of nonlinear parabolic equations of the form \begin{equation*} u_{t}=\Delta u^{m}+a(x, t)u\log u+b(x, t)u, \quad 1-\frac{2}{n}<m<1 \quad \text{or}\quad 1<m<1+\frac{1}{1+\sqrt{2n}}, \end{equation*} on a complete Riemannian manifold $(M,g)$ of dimension $n$, where $a(x, t)$, $b(x, t)$ are $C^{1}$ functions. For $a=b=0$, this equation becomes the porous medium equation (PME) or the fast diffusion equation (FDE) when $m>1$ or $m<1$, respectively. As consequences, we obtain Liouville type theorems for the corresponding constant coefficient equations when \begin{equation*} 1-\frac{1}{\sqrt{n-1}}<m<1\quad \text{and}\quad 1<m<1+\frac{1}{\sqrt{n-1}}. \end{equation*}

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31393)

## Horizon saddle connections and Veech groups of infinite-type dilation surfaces

Oscar Rutilio Molina Medrano

对自相似端空间且各端被亏格累积的曲面，实现任意可数 SL(2,R) 子群为伸缩曲面的 Veech 群，并可指定 horizon 鞍连接的方向。

This paper studies Veech groups of dilation surfaces whose fundamental group is not finitely generated. We prove that if $ S$ is a surface with self-similar end space and every end is accumulated by genus, then every countable subgroup of $SL(2,\mathbb{R}) $ can be realized as the Veech group of a dilation surface homeomorphic to $ S$. Additionally, we can construct this dilation surface such that it realizes horizon saddle connections in a prescribed set of directions. This contrasts with the case of closed dilation surfaces, where horizon saddle connections impose restrictions on the algebraic structure of the Veech group.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31447)

## On the Relation Between Non-Semisimple TQFTs

Marco De Renzi

构造三维扩展 TQFT，将 Kerler–Lyubashenko 理论及基于修正迹的重整化版本包含在同一框架中，并去除曲面可容许性条件，使圆的范畴恢复为完整模范畴 C。

The goal of this paper is to clarify the relation between the Kerler-Lyubashenko TQFT $J_\mathcal{E}$ associated with the adjoint end $\mathcal{E}$ of a (not necessarily semisimple) modular category $\mathcal{C}$ and its renormalized version $V_\mathcal{E}$ based on the modified trace supported by the ideal $\mathrm{Proj}(\mathcal{C})$ of projective objects of $\mathcal{C}$. More precisely, we construct a $3$-dimensional ETQFT $\boldsymbol{\hat{A}}_\mathcal{E}$ that contains both $J_\mathcal{E}$ and $V_\mathcal{E}$. The ETQFT $\boldsymbol{\hat{A}}_\mathcal{E}$ is given by a $2$-functor whose source is the $2$-category of admissible $3$-dimensional cobordisms, and whose target is the $2$-category of finitely complete linear categories. We improve on earlier versions of the construction by dropping the admissibility condition for surfaces. By doing so, we obtain an ETQFT whose circle category $\boldsymbol{\hat{A}}_\mathcal{E}(\boldsymbol{S}^1)$ is equivalent to the category $\mathcal{C}$, as opposed to the ideal $\mathrm{Proj}(\mathcal{C})$.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31449)

## Rotationally Symmetric Zoll Metrics with a Cubic Integral

Holger R. Dullin、Vladimir S. Matveev、Gleb P. Palshin、Serena Scapucci

利用 Funk 度量形式与第一积分间的代数关系，将构造化为可显式求解的代数系统，得到涵盖球面全部相应旋转对称 Zoll 度量的二参数族。

We introduce a new method for constructing Zoll metrics that admit first integrals polynomial in the momenta. The method uses Funk's form of the metric together with an algebraic relation between the first integrals. This reduces the problem to an algebraic system from which all unknown functions can be determined explicitly. In the case of a non-trivial cubic integral, we present an explicit two-parameter family of metrics that covers all such rotationally symmetric Zoll metrics on the $2$-sphere: every such metric is isometric to a member of this family. We compare these metrics with the earlier results of Valent, Duval, and Shevchishin.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31481)

## Teichmüller and moduli spaces for complex nilmanifolds

Konstantin Wehler

建立复幂零流形间全纯映射的结构定理、两个周期映射及模空间复结构判据，并对主环面丛和几乎阿贝尔幂零流形等类证明整体 Torelli。

We develop several tools to study the local and global structure of the Teichmüller and moduli spaces for complex nilmanifolds. As a starting point, we prove a structure theorem for holomorphic maps between complex nilmanifolds, which allows for an explicit description of the Teichmüller and moduli spaces. We then introduce two period maps, and give general criteria for the existence of a complex structure on these spaces. To illustrate the theory, we prove a global Torelli theorem for various classes of nilmanifolds, including principal torus bundles over tori and almost abelian nilmanifolds. In particular, we show that there are nilmanifolds of arbitrary dimension and nilpotency index for which the Teichmüller space admits the structure of a complex manifold.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31516)

## Profinite Non-Rigidity of Arithmetic Lattices and the Kähler Property

Yukun Du、Feng Hao、Kejia Zhu

分类可出现非同构高秩实 Lie 群算术格且具有同构 profinite 完备化的绝对 Dynkin 类型，并证明有限表现剩余有限群的 Kähler 性不由 profinite 完备化决定。

We study the profinite non-rigidity of arithmetic lattices and its implications for the Kähler property. In the first part, we characterize the absolute Dynkin types that admit non-isomorphic real forms of higher-rank Lie groups containing torsion-free arithmetic lattices with isomorphic profinite completions. In the second part, as a geometric application, we answer a question asked independently by Arapura and Libgober, by showing that the Kählerness of finitely presented, residually finite groups is not determined by its profinite completion.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31523)

## Bi-invariant Geodesic Regression: Existence, Uniqueness, and Convergence

Martin Hanik、Christoph von Tycowicz

为双不变测地回归证明局部唯一估计量存在，给出邻域大小的显式界，并证明迭代算法线性收敛。

Bi-invariant geodesic regression generalizes linear regression to Lie groups. Its main feature is that it respects the symmetries of the group so that the resulting estimator is independent of arbitrary choices such as a reference frame. However, the local existence and uniqueness of the underlying estimator have not been shown until now. Furthermore, the convergence properties of the proposed algorithm for computing the estimator are not known. In this work, we investigate these questions. We prove that, locally, a unique estimator exists and give explicit bounds on the size of this neighborhood. We also show that the proposed iterative algorithm converges linearly to this estimator.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31526)

## Anchor Radicals and Metric Rigidity in $n$-Lie--Rinehart Algebras

Irmely Gladesh Mabanza Nsiloulou、Basile Guy Richard Bossoto

针对 n>2 的锚映射，引入 L 内的锚根并证明其为伴随稳定理想，刻画度量相容性 A 线性的障碍，以及强非退化相容度量迫使全局锚消失的刚性。

For an $n$-Lie--Rinehart algebra, $n>2$, the anchor is defined on $\Aext{n-1}L$, so its kernel does not determine a distinguished submodule of $L$. We introduce the anchor radical $\Rad(\rho)\subset L$ and prove that it is an adjoint-stable ideal on which the bracket is $A$-multilinear. We then derive an explicit obstruction to the $A$-linearity of metric compatibility in fundamental directions. This obstruction vanishes on $\Rad(\rho)$, whereas a strongly nondegenerate compatible metric on all of $L$ forces the anchor to vanish. These results lead to a natural notion of orthogonal structure on the anchor radical. For anchors induced by Nambu tensors, the radical is identified with the cotangent annihilator of the tensor.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31538)

## On Line-Hyperplane Structures for Hitchin Representations

Parker Evans、Andrea Tamburelli

研究线与超平面旗流形中的余紧间断域及其四重覆盖，分类其在双曲平面上的闭 2n−5 维纤维的同胚型，并在相差同伦球的意义下确定微分同胚型。

Let $n \geq 4$ and $\rho: \pi_1S \rightarrow PSL(n,\mathbb{R})$ be a Hitchin representation. We study the topology of a cocompact domain of discontinuity $\Omega_{\rho}$ in the flag manifold $\mathcal{F}_{1,n-1}$ of line-hyperplane pairs in $\mathbb{R}^n$ defined by Guichard-Wienhard. In particular, we lift $\Omega$ to its $(\mathbb{Z}_2\times \mathbb{Z}_2)$-cover $\hat{\Omega}$ in the Stiefel manifold $V_2(\mathbb{R}^n)$. The domain $\hat{\Omega}$ is highly connected and smoothly fibers over hyperbolic space $\mathbb{H}^2$ with unknown fiber $\hat{\mathfrak{F}}$, a closed $(2n-5)$-manifold. We determine the homeomorphism type of $\hat{\mathfrak{F}}$ as well as its diffeomorphism type up to connected sum with a homotopy sphere. The classification of $\hat{\mathfrak{F}}$ involves computing both its homology and a certain differential topology invariant needed to invoke Wall's classification of highly connected odd-dimensional manifolds.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31567)

## General regularity obstructions for the arrival time equation

Yiqi Huang、Jingze Zhu

利用球形奇点附近高阶渐近构造各维不可数多个低正则到达时间函数，特别证明平面凸曲线缩短流的到达时间不必 C25，与伴随论文的 C24,α 上界配合定位阈值。

We study the regularity of the arrival time function associated with mean curvature flow, formulated as a degenerate elliptic equation encoding the singular structure of the flow. We identify a systematic mechanism obstructing higher regularity, arising from higher-order asymptotic expansions near spherical singularities. We construct uncountably many low-regularity arrival time functions in all dimensions. In particular, we settle the question of smoothness in the planar case by showing that even for convex curve shortening flow the arrival time need not be $C^{25}$. Our companion paper proves that every such arrival time is $C^{24,\alpha}$ for any $0<\alpha<1$. Hence the obstruction at order $25$ gives the optimal regularity threshold. Our approach introduces new analytic ingredients, including a precise correspondence between elliptic asymptotic expansions and parabolic long-time asymptotics of the associated rescaled mean curvature flow, a complexification of the arrival time equation, and a method for prescribing higher-order asymptotic expansions.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31599)

## Optimal regularity for the arrival time equation

Yiqi Huang、Jingze Zhu

证明平面凸均值曲率流的到达时间为任意 α<1 的 C24,α，并给出第 24 阶导数的对数连续模；高维结合已有结果得到尖锐 C2,2/n。

For a convex mean curvature flow in $\mathbb{R}^{n+1}$, the corresponding arrival time function solves a degenerate elliptic equation that becomes singular at extinction. We prove that it is $C^{24,\alpha}$ for any $0<\alpha<1$ in the plane, with a logarithmic modulus for its twenty-fourth derivatives. We prove that this bound is sharp combining regularity obstruction in our companion paper. We obtain asymptotic expansions of the rescaled flow to any prescribed order, including derivative estimates for the remainder. Combined with the work of Sesum for $n\ge 2$, this also gives the sharp $C^{2,2/n}$ regularity for convex arrival time functions in higher dimensions.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31610)

## On Simon's area-minimizing hypersurfaces with fractal singular sets

Zhenhua Liu

证明 Leon Simon 构造的具有指定奇点集的稳定极小超曲面实际上面积极小，从而确认分形奇点集可在面积极小超曲面中实现。

We verify that the stable minimal hypersurfaces with prescribed singular sets constructed by Leon Simon are area-minimizing. Thus, Simon's work settles the existence of area-minimizing hypersurfaces with fractal singular sets.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31615)

## Singularity models for the Bernoulli free boundary problem from isoparametric hypersurfaces

Benjy Firester、Raphael Tsiamis、Zihui Zhao

由球面等参叶状结构构造 Bernoulli 自由边界齐次解和极值域，得到新拓扑族及低维奇点模型，并证明给定叶状结构下径向几何唯一决定解。

We develop a general construction of homogeneous solutions to the Bernoulli free boundary problem, as well as general extremal domains on the sphere, from isoparametric foliations of the sphere. Our construction produces rich families of infinitely many new examples with sophisticated topologies connected to minimal surfaces of the sphere by smooth families of interpolating capillary surfaces, which include novel singularity models in low dimensions and recover most known homogeneous one-phase solutions. We also introduce a geometric representation for every such homogeneous map and establish a geometric rigidity theorem: for every prescribed isoparametric foliation, and in particular for cohomogeneity-one subgroups of $O(n)$, its radial geometry uniquely determines the corresponding homogeneous solution. Finally, we study the density of the constructed solutions and conjecture that the lowest density among non-flat cones in a given dimension $n \geq 5$ is attained by an $O(k) \times O(n-k)$-invariant cone.

AI 披露待完成核查（不能仅凭摘要判断）



[arXiv](https://arxiv.org/abs/2609.31617)
