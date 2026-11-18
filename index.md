# 几何前沿日报 · 2026-11-18

已收录 39/39 · 解读 39/39。

## Geometry and Stochastic Analysis of Flow and Diffusion Models: A Survey

Ehsan Mirafzali、Razvan Marinescu

从状态空间、概率测度空间和生成路径空间三个层次组织流模型与扩散模型。用噪声、数据或 Wiener 空间的积分分部解释 score 恒等式，再用 Malliavin 微积分处理非线性和无穷维扩散。

Flow-based and diffusion-based models have become the principal means of learning and sampling high-dimensional probability distributions, from images and video to proteins, molecules and physical fields, and increasingly language. Each carries a simple law to the law of the data along a curve of probability measures, and behind the variety of their names lie three geometries, those of the state space on which the data live, of the space of probability measures through which the curve passes, and of the space of paths traced by the generating process. A single analytic idea runs through the subject. Every score identity used to train a diffusion model is an integration by parts, on the noise, on the data or on Wiener space, and Malliavin calculus extends this to nonlinear and infinite-dimensional diffusions. We develop these foundations with full definitions and follow them through normalising flows, flow matching and few-step maps, diffusion models and their convergence theory, conditioning, Schrödinger bridges and stochastic control, and their extension to manifolds, Lie groups, discrete and function spaces and jump processes. We close with statistical physics, renormalisation and, more speculatively, holography, in which the radial direction of anti-de Sitter space can play the role of flow time. A table of the main methods and a collection of open problems complete the survey.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文命中集中在生成模型主题、外部研究及参考文献，未见本版作者关于写作或研究中使用生成式 AI 的披露。第13页 G pT 是概率密度公式中的符号，第60–62页 GPT-2 与困惑度是综述他人模型和实验，第132页对应模型论文题名。

来源：https://arxiv.org/pdf/2611.12107v1

[arXiv](https://arxiv.org/abs/2611.12107)

## A singular minimizer of a uniformly convex Hessian-dependent functional

Arunima Bhattacharya、Anna Skorobogatova

存在F∈C∞(Sym(5))，其二阶导在所有对称矩阵上有统一上下正界。Cartan三次型P的二次齐次归一化u=P/|x|（u(0)=0）在五维单位球内弱解div div DF(D²u)=0，并对每个φ∈W₀^{2,2}满足能量差≥(λ/2)∫|D²φ|²。因此u是在光滑边界数据u=P、∂νu=2P下的唯一极小元，属于W^{2,∞}且仅在原点非C²。加上惰性变量的构造使任意n≥5维都有奇异集恰为余维5平面与单位球交集的例子。

We construct a smooth, uniformly convex Hessian-dependent energy functional, which admits a singular $C^{1,1}$ minimizer on $\mathbb{R}^5$ that is a two-homogeneous normalization of Cartan's five-dimensional cubic. Our construction relies on constructing a quadratic null Lagrangian for the Hessian that is suitably non-degenerate on the image of the Hessian for the candidate minimizer. This complements a partial regularity result previously obtained by the authors in this setting, and demonstrates that one cannot hope for a fourth-order version of classical second-order elliptic regularity theory à la De Giorgi-Nash-Moser.

明确披露 AI 协作：第6页明确披露用AI协助识别合适二次零Lagrangian所需的部分代数计算，记录computation。作者说明主证明策略和Cartan型候选均由作者提出，相关计算与论证经作者大幅重做，全文由作者撰写。声明另把第4页Remark 1.3中仅严格凸的辅助例子想法归于AI，归因限于该例子。

来源：https://arxiv.org/pdf/2611.20396v1 · PDF第6页Note on LLM Usage及第4页Remark 1.3，全文23页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第6页明确披露用AI协助识别合适二次零Lagrangian所需的部分代数计算，记录computation。作者说明主证明策略和Cartan型候选均由作者提出，相关计算与论证经作者大幅重做，全文由作者撰写。声明另把第4页Remark 1.3中仅严格凸的辅助例子想法归于AI，归因限于该例子。

来源：https://arxiv.org/pdf/2611.20396v1

[arXiv](https://arxiv.org/abs/2611.20396)

## A Sharp Perimeter Inequality for Mean Distances on Convex Curves

Eric Shen

对平面凸体 K，在边界弧长概率测度下独立取样两点，所得平均欧氏距离 θ(K) 严格大于周长的 1/6。长矩形的宽长比趋零时，θ(K)/per(K) 趋于 1/6。

For a planar convex body $K$, let $\theta(K)$ denote the expected Euclidean distance between two independent points uniformly distributed on $\partial K$ with respect to arclength. We prove the sharp inequality $$\frac{\theta(K)}{\operatorname{per}K}>\frac{1}{6}.$$ The constant is approached by rectangles degenerating to a segment.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。对本版本共10页的全文和候选元数据做标准及补充搜索，未观察到作者披露自身使用 AI。

来源：https://arxiv.org/pdf/2611.21661v1

[arXiv](https://arxiv.org/abs/2611.21661)

## Sharp modified logarithmic Sobolev inequality for matrix-valued functions on spheres

Li Gao、Long Zhao

设 d≥2，g 为单位球面 Sᵈ 上任意尺寸的光滑正定复矩阵场。对归一化球面测度和正 Laplacian Δ，矩阵相对熵 D(g‖Eg) 满足 D≤I/(2d)，其中 I=∫tr((Δg)log g) dμ。逐分量热半群使 D 和 I 都至多按 e^(−2dt) 衰减。

We prove that for every smooth positive definite matrix-valued function $g$ on the unit sphere $S^d$, \[ \int_{S^d}\tr(g(\log g-\log\E g))\dd \le\dfrac1{2d}\int_{S^d}\tr((\Delta g)\log g)\dd. \] Here $\mu$ is normalized area measure, $\E g$ is the spherical mean, and $\Delta$ is the positive spherical Laplacian. This complete modified logarithmic Sobolev inequality extends Beckner's sharp logarithmic Sobolev inequality, in its modified form, to matrix-valued functions independent of the matrix size. We show that both entropy and Fisher information decay exponentially under the heat flow with optimal exponent $2d$, whose proof combines the Bochner identity with a $4$th-tensor estimate in the matrix-valued setting.

明确披露 AI 协作：作者披露 ChatGPT 6.1-Sol 协助探索，以及起草和修订论文论述。声明未指认具体证明或核心策略由模型生成。作者对数学内容和终稿负责。

来源：https://arxiv.org/pdf/2611.21704v1 · PDF 第2页 Acknowledgment

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露 ChatGPT 6.1-Sol 协助探索，以及起草和修订论文论述。声明未指认具体证明或核心策略由模型生成。作者对数学内容和终稿负责。

来源：https://arxiv.org/pdf/2611.21704v1

[arXiv](https://arxiv.org/abs/2611.21704)

## Translation surfaces with logarithmically growing systole

Benjamin Dozier

作者构造每个亏格g对应一张面积为g的平移曲面T_g，使其systole随g以对数量级增长。方法从固定平移曲面出发，取拓扑与Brooks所构造覆盖相同的覆盖，再沿切缝粘合添加把手。

We exhibit a sequence of translation surfaces $T_1, T_2,...$ with $T_g$ of genus $g$ and area $g$, such that the systole grows logarithmically with $g$. They are produced by starting with a fixed translation surface, taking covers with the same topology as those discovered by Brooks, and then adding handles by gluing along slits.

明确披露 AI 协作：第3页作者把命题2.1的证明策略明确归于GPT-6 Astra。该命题是后续处理所有亏格的起点，记录ideas。GPT-6还依据作者手绘图生成论文插图，并检查完稿、指出几处由作者手工改正的小错，记录verification。作者独立完成具体证明和论文文字。第6页补检候选来自geodesic segment等数学文字。

来源：https://arxiv.org/pdf/2611.21853v1 · PDF第3页AI usage statement，全文10页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第3页作者把命题2.1的证明策略明确归于GPT-6 Astra。该命题是后续处理所有亏格的起点，记录ideas。GPT-6还依据作者手绘图生成论文插图，并检查完稿、指出几处由作者手工改正的小错，记录verification。作者独立完成具体证明和论文文字。第6页补检候选来自geodesic segment等数学文字。

来源：https://arxiv.org/pdf/2611.21853v1

[arXiv](https://arxiv.org/abs/2611.21853)

## Virtually solvable groups with balanced presentations

Jonathan A. Hillman

设 G 为几乎可解、Hirsch 长度有限的群。若其有理群同调满足 β₂(G;ℚ)≤β₁(G;ℚ)，则 β₁(G;ℚ)≤3。作者用此改进嵌入 S⁴ 的三维流形 Betti 数约束，条件是两个互补区域的基本群均为有限 Hirsch 长度的几乎可解群。

We show that if $G$ is a virtually solvable group with finite Hirsch length and such that $\beta_2(G;\mathbb{Q})\leq\beta=\beta_1(G;\mathbb{Q})$ then $\beta\leq3$. This sharpens bounds on the Betti numbers of 3-manifolds which embed in $S^4$ with the fundamental groups of each complementary region virtually solvable and of finite Hirsch length.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第6页 Tool use 声明作者在工作的任何部分均未使用 AI 工具。其余全文及候选元数据检索未见正面使用披露。

来源：https://arxiv.org/pdf/2611.21875v1

[arXiv](https://arxiv.org/abs/2611.21875)

## Finite time blow-up for the Willmore flow of symmetric figure-eight tori

Fabian Rupp、Manuel Schlierf

若旋转环面的母线转数为零，且 γ₀(−x)=diag(−1,1)γ₀(x)，那么初始 Willmore 能量 W≤12π 时，流会在有限时间产生奇性。

We show that the Willmore flow of symmetric figure-eight tori of revolution produces a finite time singularity, provided the initial energy is below $12\pi$. Our approach relies on the connection with elastic curves in the hyperbolic plane and a fine analysis of Palais--Smale sequences in the relevant energy regime.

明确披露 AI 协作：作者披露 GPT-6 Astra Ultra 提出引理 2.9 中连接外区极限与集中点附近行为的论证，补全作者已有路线。作者核对、简化后纳入。Claude Opus 5.5 根据手绘制作图 1 的 TikZ 并修改披露措辞。

来源：https://arxiv.org/pdf/2611.21887v1 · PDF 第 14 页，AI declaration

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露 GPT-6 Astra Ultra 提出引理 2.9 中连接外区极限与集中点附近行为的论证，补全作者已有路线。作者核对、简化后纳入。Claude Opus 5.5 根据手绘制作图 1 的 TikZ 并修改披露措辞。

来源：https://arxiv.org/pdf/2611.21887v1

[arXiv](https://arxiv.org/abs/2611.21887)

## A Universal $8$-Vertex Origami Torus Triangulation

Peter Doyle、Fabian Lander、Richard Evan Schwartz、Steve Trettel

构造度序列为 4,6,6,6,6,6,7,7 的同一八顶点三角剖分，使任意平坦环面均可用它分片仿射等距嵌入欧氏三维空间。

An origami torus is a piecewise affine isometric embedding of a flat torus into $\R^3$. We prove that every flat torus is realized as an $8$-vertex origami torus based on the triangulation with degree sequence $4,6,6,6,6,6,7,7$. This provides an $8$-vertex universal triangulation for origami tori.

明确披露 AI 协作：作者披露 ChatGPT 5.6 实现部分搜索算法、优化代码、整理公式、提供文献及校读，并提出第5节计算 Jacobian 时简化角导数公式的办法。声明将证明的总体概念框架归于作者及既有研究。

来源：https://arxiv.org/pdf/2611.21909v1 · PDF 第5页 §1.5 Artificial Intelligence Use

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露 ChatGPT 5.6 实现部分搜索算法、优化代码、整理公式、提供文献及校读，并提出第5节计算 Jacobian 时简化角导数公式的办法。声明将证明的总体概念框架归于作者及既有研究。

来源：https://arxiv.org/pdf/2611.21909v1

[arXiv](https://arxiv.org/abs/2611.21909)

## Exotic smooth structures on nonorientable 4-manifolds

R. İnanç Baykur

作者用Davis–Hayden–Huang–Ruberman–Sunukjian反射技巧，构造具有任意多种彼此不同光滑结构的闭非定向非球面四维流形。对这些例子，取与实线的乘积，或与足够多份S²×S²连通和后，所得光滑流形互相微分同胚。

We construct closed nonorientable aspherical 4-manifolds with an arbitrarily large number of distinct smooth structures. This uses the reflection trick of Davis-Hayden-Huang-Ruberman-Sunukjian. Our examples become mutually diffeomorphic after either type of stabilization: taking a product with the real line, or taking a connected sum with sufficiently many copies of S^2 x S^2.

明确披露 AI 协作：第7页披露ChatGPT生成插图、编制参考文献及校对，记录literature、writing。作者还曾询问能否用全亏格函数构造无限异型族，记exploration。作者说明这一探索未进入论文内容。该页另有Jean-Claude Hausmann的姓名误命中。

来源：https://arxiv.org/pdf/2611.21967v1 · PDF第7页AI disclosure，全文8页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第7页披露ChatGPT生成插图、编制参考文献及校对，记录literature、writing。作者还曾询问能否用全亏格函数构造无限异型族，记exploration。作者说明这一探索未进入论文内容。该页另有Jean-Claude Hausmann的姓名误命中。

来源：https://arxiv.org/pdf/2611.21967v1

[arXiv](https://arxiv.org/abs/2611.21967)

## Remarks on thin sets in potential theory for sub-Laplacians

Shiguang Ma、Jie Qing

定理4.1在 Heisenberg 群构造原点处 Δ_H 细薄却与每条从原点出发的测地线相交的集合。定理5.1在可极化 Carnot 群改用 Balogh–Tyson 水平径向流线，证明每个原点处细薄集都有一条流线在原点小邻域内避开它。定理3.2对一般齐次 Carnot 群的次 Laplace 势给出细拓扑界：若紧集 S 的规度 Hausdorff 维数大于 s∈(0,Q−2)，可在某个 x₀∈S 附近的细薄例外集外以 C·d_L(x₀⁻¹x)^(2−Q+s) 控制势。

In contrast to Euclidean cases, we observe that, there are sets in Heisenberg groups that are thin at the origin and block all geodesics from the origin. However, in polarizable Carnot groups, using horizontal radial curves constructed for polar coordinates by Balogh and Tyson, we show that sets, that are thin at the origin, cannot block all horizontal curves. Consequently, we are able to use the asymptotic behavior with respect to the fine topology to estimate the Hausdorff dimension of singularities of potentials for sub-Laplacians and obtain geometric applications.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。对本版本共20页的全文和候选元数据做标准及补充搜索，未观察到作者披露自身使用 AI。

来源：https://arxiv.org/pdf/2611.21971v1

[arXiv](https://arxiv.org/abs/2611.21971)

## Hyperkähler Periods in Families of Parabolic Higgs Bundle Moduli Spaces

Panagiotis Dimakis、Laura Fredrickson、Arya Yae

让抛物权重与 Higgs 特征值同时变化，把模空间组装为光滑族，并沿参数开稠密子集中的路径平行移动同调。

We consider the period map on families of parabolic Higgs bundle moduli spaces with varying parabolic weights $\alpha$ and Higgs field eigenvalues $\sigma$. We assemble the moduli spaces into a smooth family $\pi:\mathscr M\to\Lambda$ where $\Lambda$ encodes $(\alpha,\sigma)$, and define parallel transport for homology along paths in an open dense subset $\Lambda_0\subset\Lambda$. By generalizing a classical theorem of Duistermaat and Heckman, we prove that the period map is affine linear in $(\alpha,\sigma)$, with slope governed by the curvature class of a principal torus bundle over $\mathscr M$. For the four-dimensional moduli spaces of types $E_6,E_7,E_8$, we compute these classes to get explicit formulas for the period maps.

明确披露 AI 协作：作者披露使用 ChatGPT 的 Astra 6 和 DeepSeek V4.1 Flash 帮助理解既有文献、改正排字错误并为插图编写代码。研究想法由作者提出。

来源：https://arxiv.org/pdf/2611.21990v1 · PDF 第10页 Use of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露使用 ChatGPT 的 Astra 6 和 DeepSeek V4.1 Flash 帮助理解既有文献、改正排字错误并为插图编写代码。研究想法由作者提出。

来源：https://arxiv.org/pdf/2611.21990v1

[arXiv](https://arxiv.org/abs/2611.21990)

## Gradient estimates and monotonicity formulae for the $p$-filtration equation on Riemannian manifolds

Yu-Zhao Wang、Jian-Hua Hao

研究正光滑解u的p过滤方程u_t=Δ_pF(u)，以压力v′(s)=F′(s)s^{-1/(p−1)}改写。对闭且Ric≥0的流形，p≥2和相应结构条件下得到Li–Yau与Aronson–Bénilan估计。局部Hamilton型估计适用于完备流形、p>1和球内截面曲率下界，另需压力间隙和不等式(1.17)。闭流形上Ric≥0、p>1、压力通量空间C¹且D_a≥0时，𝒲严格下降、熵幂增长且凹。另一频率定理在闭流形上无需曲率下界，条件[F(s)−F(ℓ)]²≤κF′(s)Ψ_ℓ(s)下，负耗散D除以I^γ在I>0时单调不减，0<γ≤p/κ。

We derive Li--Yau type estimates on closed Riemannian manifolds and local Hamilton-type gradient estimates on complete manifolds for the $p$-filtration equation $u_t=\Delta_pF(u)$. Under nonnegative Ricci curvature and a structural condition on $F$, we establish a $\mathcal W$-entropy formula, entropy-power concavity and local entropy rigidity. We also prove a parabolic frequency monotonicity formula without curvature assumptions. The results include homogeneous doubly nonlinear diffusion and extend to nonhomogeneous power sums and the arctangent law.

明确披露 AI 协作：第38页明确披露以ChatGPT-6 Astra为主协助LaTeX编辑、改善证明表述、检查计算和一致性，记录writing及verification。研究构思、数学路线和主要证明论证归作者。

来源：https://arxiv.org/pdf/2611.22071v1 · PDF第38页AI tool disclosure，全文40页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第38页明确披露以ChatGPT-6 Astra为主协助LaTeX编辑、改善证明表述、检查计算和一致性，记录writing及verification。研究构思、数学路线和主要证明论证归作者。

来源：https://arxiv.org/pdf/2611.22071v1

[arXiv](https://arxiv.org/abs/2611.22071)

## On the Morse index of some Riemannian homogeneous fibrations

Luiz Lara、Éric Loubeau

写 g_t=g_H+t g_V，0<t≤1，g_H、g_V 来自单位圆球，固定使投影为黎曼下沉的目标圆度量。四元数 Hopf S⁷→S⁴ 的指标随 t 下降依次为 45、13、5，阈值 3/4、3/8，等号处取较低指标。八元数 Hopf S¹⁵→S⁸ 对应为 153、25、9，阈值 7/16、7/20。四元数情形通常零度 10，在 t=1、3/4、3/8 为 25、42、18。八元数情形通常零度 36，在 t=1、7/16、7/20 为 120、164、52。

In this paper, we use the technique developed by the first named author in arXiv:2610.07815 to compute the Morse-index of some Riemannian homogeneous fibrations. For the quaternionic (resp. octonionic) Hopf fibration, we compute the index and nullity, where the metric on the $\mathbb{S}^7$ (resp. $\mathbb{S}^{15}$) is the quaternionic (resp. octonionic) Hopf--Berger metric. In particular, for the round metric on the domain, the Morse-index is $45$ (resp. $153$). We also give a spectral formula for the Aloff--Wallach projections. In particular, we obtain that the Konishi $\mathbb{R} P^3$-fibration $N_{1,1}\to\mathbb{C} P^2$ is stable throughout the two-parameter metric family, while the unit tangent sphere bundle $T^1(\mathbb{C} P^2)\to \mathbb{C} P^2$ is stable under some conditions on the metric. We also compute the index and nullity of the Clifford hypersurface in the fiber-squashing range of the quaternionic Berger family. Finally, for the identity map on the quaternionic Hopf--Berger spheres, we determine its Morse--index by an explicit sequence of transition parameters.

明确披露 AI 协作：第23页 AI STATEMENT 说明作者使用 ChatGPT Astra 6.1 协助撰写部分文字，并进行第4节与第6节的表示论计算。第1页命中是该声明的目录项。

来源：https://arxiv.org/pdf/2611.22090v1 · PDF 第23页，AI STATEMENT

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第23页 AI STATEMENT 说明作者使用 ChatGPT Astra 6.1 协助撰写部分文字，并进行第4节与第6节的表示论计算。第1页命中是该声明的目录项。

来源：https://arxiv.org/pdf/2611.22090v1

[arXiv](https://arxiv.org/abs/2611.22090)

## Uniqueness of tangent flows in mean curvature flow (I): smooth minimal cone

Hanbing Fang、Yongheng Han

对光滑嵌入、无边界、空间及时空均 proper 且有一致面积比上界的超曲面平均曲率流，若一个切流为满足 S1–S3 的静态重数一极小锥，则该点所有切流在原坐标下相同。

We prove uniqueness of multiplicity-one minimal-cone tangent flows in mean curvature flow when the cone has a smooth embedded two-sided link and satisfies strict Hardy stability, radial Gaussian nonresonance, and weighted stationary rigidity. We also establish a discrete Lojasiewicz inequality, polynomial convergence rates, and rigidity among smooth self-shrinkers. In particular, these conclusions hold for all Simons cones $\mathcal C_{p,q}$ with $p,q \geq 1, p+q\geq 6$.

明确披露 AI 协作：作者披露广义 Simons 锥项目中二次定义函数的抛物型不等式研究使用了 AI。本文研究一般极小锥、Łojasiewicz 不等式及刚性时也使用 ChatGPT-6 Astra 与 Danus，未逐项说明具体证明贡献。

来源：https://arxiv.org/pdf/2611.22105v1 · PDF 第 9 页，AI disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露广义 Simons 锥项目中二次定义函数的抛物型不等式研究使用了 AI。本文研究一般极小锥、Łojasiewicz 不等式及刚性时也使用 ChatGPT-6 Astra 与 Danus，未逐项说明具体证明贡献。

来源：https://arxiv.org/pdf/2611.22105v1

[arXiv](https://arxiv.org/abs/2611.22105)

## Three Circles in a Unit Disk: Three Solutions to an Extremal Problem

Anatoly Eydelzon

先放置两个彼此相切且均内切单位圆的圆盘，再置入最大的第三圆盘。作者得到面积和下界 11π/18，并描述全部等号情形。

We place two disks inside the unit disk so that they touch each other and the unit circle. We then insert a disk of the largest possible radius, requiring it to touch both original disks. We show that the smallest possible sum of the three areas is $11\pi/18$, and find all equality cases. We give three solutions, using Descartes' circle theorem, inversion, and contact-point coordinates. The main difficulty is checking that the third disk is largest among all disks that fit, not only among disks touching the first two.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文关键词、点写 AI 和断行模型名等补检未见本版本的作者生成式 AI 使用声明。

来源：https://arxiv.org/pdf/2611.22121v1

[arXiv](https://arxiv.org/abs/2611.22121)

## Continuous improved Hölder and reverse Hölder inequalities for Gaussian random vectors

Ai-Jun Li、Qingzhong Huang

作者把相关Gaussian向量改进Hölder和反向Hölder不等式从有限协方差矩阵推广到参数场Hilbert空间的协方差算子。用协方差与指数乘子间的算子比较给出两类不等式，并将等号刻画为底层Gaussian空间上存在相容概率密度。该密度分解为共同特征空间上的独立因子及均值、协方差满足代数条件的Gaussian因子。

We establish continuous versions of the improved Hölder and reverse Hölder inequalities for correlated Gaussian random vectors, where a finite covariance matrix is replaced by a covariance operator acting on a Hilbert space of parameter fields. Under operator comparisons between the covariance and the exponent multiplier, we prove both inequalities and characterize equality in terms of a compatible probability density on the underlying Gaussian space. We further describe this density as a product of independent factors on common eigenspaces and a Gaussian factor whose mean and covariance satisfy explicit algebraic conditions. In the reverse setting, positive and negative exponents may coexist. The continuous product is defined by ordered truncation, allowing zeros in the positive-exponent factors. The equality proof combines an exact Ornstein--Uhlenbeck semigroup comparison, a spectral gap away from the kernel of the governing operator difference, and characteristic-function deconvolution. We also treat exponential quadratic functions without requiring a uniform positive-definiteness margin on the precision matrices.

明确披露 AI 协作：第27页致谢明确披露ChatGPT 6用于探索部分证明策略、检查计算和改善语言与表述，记录exploration、verification及writing。作者说明主要构思和路线由作者发展。首页Ai-Jun是作者名，其他llm候选来自full-measure、all mixed及all marginals等常规词组。

来源：https://arxiv.org/pdf/2611.22143v1 · PDF第27页Acknowledgments，全文28页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第27页致谢明确披露ChatGPT 6用于探索部分证明策略、检查计算和改善语言与表述，记录exploration、verification及writing。作者说明主要构思和路线由作者发展。首页Ai-Jun是作者名，其他llm候选来自full-measure、all mixed及all marginals等常规词组。

来源：https://arxiv.org/pdf/2611.22143v1

[arXiv](https://arxiv.org/abs/2611.22143)

## Cyclic group actions on K3 surfaces and almost complex structures

David Baraglia

对 Fintushel–Stern–Sunukjian 在 K3 上经 twist-rim surgery 构造的 n=2、3、4 的异型循环群作用，作者证明其无法保持 Ricci 平坦度量或可积复结构，给 Farb–Looijenga 问题否定答案。另证明固定点全部非孤立的光滑循环群作用保持首陈类为零的殆复结构。

Fintushel, Stern and Sunukjian constructed exotic $\mathbb{Z}_n$-actions on $K3$ for $n=2,3,4$ using twist-rim surgery. We prove that these exotic actions do not preserve any Ricci flat metric or any integrable complex structure. This answers a question of Farb and Looijenga in the negative. In contrast, we prove that any smooth $\mathbb{Z}_n$-action on $K3$ for which the fixed point set has only non-isolated fixed points preserves an almost complex structure with trivial first Chern class. In particular, this applies to the Fintushel-Stern-Sunukjian examples. Lastly, we classify the possible fixed point data and action on cohomology for cyclic group actions on $K3$ of prime order which preserve an almost complex structure with trivial first Chern class.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第32页 AI Declaration 声明论文制作各阶段均未使用 AI 工具。第4页致谢列出研究资助。其余全文及候选元数据检索未见正面使用披露。

来源：https://arxiv.org/pdf/2611.22154v1

[arXiv](https://arxiv.org/abs/2611.22154)

## Extremal metrics for the $G$-invariant Steklov eigenvalues

Eduardo Longa

在紧致连通有边界流形上，紧 Lie 群正维、有效且边界非传递时，作者排除各归一化不变 Steklov 特征值的极值不变度量，并在固定不变共形类中使首个正不变特征值的归一化量无界。

We study the $G$-invariant Steklov spectrum of compact connected Riemannian manifolds with boundary, endowed with an effective isometric action of a compact Lie group $G$. Under a mild nontransitivity assumption on the boundary action, we establish that this spectrum consists of an infinite sequence of eigenvalues diverging to infinity. We then investigate extremal metrics for the normalised $G$-invariant Steklov eigenvalue functionals. Assuming that $\dim G \geq 1$, we prove that none of these functionals admits an extremal $G$-invariant metric. Moreover, when $\dim M \geq 3$, the normalised first $G$-invariant Steklov eigenvalue is unbounded above even within a fixed $G$-invariant conformal class. The proof relies on a local model near a boundary orbit and spectral convergence under conformal collapse. Finally, in contrast with the upper bounds obtained by Colbois, Dryden and El Soufi for invariant Laplace eigenvalues of embedded spheres of revolution, we construct, for any $n \geq 3$, a sequence of smooth Euclidean domains of revolution in $\mathbb R^n$, all diffeomorphic to the ball, along which the normalised first $G$-invariant Steklov eigenvalue blows up.

明确披露 AI 协作：作者披露 GPT-5.6 Sol 与 GPT-6 Astra 协助审校、组织和制图，参与命题 5.4 的估计，并提出第 7 节旋转欧氏区域的初始构造。定理 B 主思路在致谢中归于 Bruno Colbois。

来源：https://arxiv.org/pdf/2611.22168 · PDF 第 5 页，Statement on the use of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露 GPT-5.6 Sol 与 GPT-6 Astra 协助审校、组织和制图，参与命题 5.4 的估计，并提出第 7 节旋转欧氏区域的初始构造。定理 B 主思路在致谢中归于 Bruno Colbois。

来源：https://arxiv.org/pdf/2611.22168

[arXiv](https://arxiv.org/abs/2611.22168)

## On Contractibility of Geometric Joins

Dohyeon Lee

将 Rᵈ 中各色集合的至多单色一点凸包取并。作者对每个 d≥4 构造 ⌈(d−1)²/2⌉ 个集合，其几何 join 不可缩。

The geometric join of a family of sets in $\mathbb R^d$ is the union of the convex hulls of all colorful sets. For every $d \geq 4$, we construct $\lceil\frac{(d-1)^2}{2}\rceil$ sets in $\mathbb R^d$ whose geometric join is not contractible, disproving the conjecture of Bárány, Holmsen, and Karasev that the geometric join of at least $d+1$ sets is contractible.

明确披露 AI 协作：作者报告在很少数学引导下与 ChatGPT 6-Pro 多轮互动得到引理2的初版证明，并与 OpenAI 和 Anthropic 模型互动发现和完善其余定理、证明及表达。引理2提供把非星形几何 join 提升为高一维不可缩 join 的论证，属于本文反例的一环。作者称已核验所有结果。

来源：https://arxiv.org/pdf/2611.22182v1 · PDF 第3页 Declaration of Use of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者报告在很少数学引导下与 ChatGPT 6-Pro 多轮互动得到引理2的初版证明，并与 OpenAI 和 Anthropic 模型互动发现和完善其余定理、证明及表达。引理2提供把非星形几何 join 提升为高一维不可缩 join 的论证，属于本文反例的一环。作者称已核验所有结果。

来源：https://arxiv.org/pdf/2611.22182v1

[arXiv](https://arxiv.org/abs/2611.22182)

## Algebraic Vector Fields on Compact Homogeneous Spaces are 2-generated

Yiyang Jiang、Xudong Chen

设紧Lie群K光滑传递地作用在紧连通流形M上。作者证明代数向量场组成的Lie代数由两个向量场生成，其中代数性指K平移张成有限维空间。由此，两个生成向量场的流所生成的子群在Diff(M)的恒等连通分支中稠密。球面的显式生成元来自已有球面向量场结果。

Let $M$ be a compact, connected manifold on which a compact Lie group $K$ acts smoothly and transitively. We show that the Lie algebra of algebraic vector fields on $M$, i.e., of smooth vector fields whose translates under $K$ span finite-dimensional spaces, is generated by two vector fields. Consequently, the subgroup generated by the flows of these two vector fields is dense in the identity component of the diffeomorphism group of $M$. For spheres, explicit generators are obtained from earlier results on spherical vector fields.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文原检索和扩展检索未观察到作者AI使用披露。第27页GPT候选源于数学符号G_p与through一词的拼接，另复查结尾参考文献及联系信息。

来源：https://arxiv.org/pdf/2611.22265v1

[arXiv](https://arxiv.org/abs/2611.22265)

## Orbifold Morse Handles II. Boundary Regions, Gluing Maps, and Surgery Cobordisms

Suhyoung Choi、Juseop Lee

对由有限群在 SO(4) 中的忠实表示及指标 1、2、3 的不变分裂给出的四维商手柄，用带标号奇异图描述三维附着区与腰带区，并确定边界黏合映射的 orbifold 同痕类。固定反定向且诱导局部群同构的附着嵌入后，腰带区延拓条件刻画在共同外部逐点固定的余边微分同胚。

We study four-dimensional quotient handles defined by faithful representations of finite groups in $\mathrm{SO}(4)$ and invariant splittings of indices $1$, $2$, and $3$. We identify their attaching and belt regions as oriented $3$-orbifolds described by labeled singular graphs. We determine the orbifold isotopy class of the boundary gluing map. Fix an orientation-reversing orbifold embedding of the attaching region into an oriented $3$-orbifold. Assume that the embedding induces isomorphisms on local groups. The regions, gluing class, and embedding determine the surgery. For a fixed handle and attaching image, an extension condition on the belt region characterizes diffeomorphisms of the cobordisms fixing a specified common exterior pointwise. For index-$2$ handles, this condition is the vanishing of an integer twist in the fixed boundary coordinates. We use these surgeries to construct a compact connected oriented $4$-orbifold cobordism from every closed connected oriented $3$-orbifold $\mathcal O$ to $S^3$. A finite sequence of index-$2$ orbifold handle attachments from $\mathcal O$ to $S^3$ exists if and only if $\mathcal O$ has no tetrahedral, octahedral, or icosahedral vertices. Let $v_{\mathbf T}(\mathcal O)$, $v_{\mathbf O}(\mathcal O)$, and $v_{\mathbf I}(\mathcal O)$ denote the numbers of these vertices. Among finite sequences of handle attachments of indices $1$, $2$, and $3$ from $\mathcal O$ to $S^3$, the minimum total number of index-$1$ and index-$3$ handles is $\left\lceil\frac{v_{\mathbf T}(\mathcal O)}{2}\right\rceil+ \left\lceil\frac{v_{\mathbf O}(\mathcal O)}{2}\right\rceil+ \left\lceil\frac{v_{\mathbf I}(\mathcal O)}{2}\right\rceil$.

明确披露 AI 协作：第44页声明第二作者用 ChatGPT（OpenAI）编辑英文、辅助 LaTeX、核对参考资料及组织论述，并协助审查与修订部分数学论证。作者共同负责数学陈述及证明。其他命中为目录项、orbifold 记号及群分类符号。

来源：https://arxiv.org/pdf/2611.22293v1 · PDF 第44页，Declaration of AI use

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第44页声明第二作者用 ChatGPT（OpenAI）编辑英文、辅助 LaTeX、核对参考资料及组织论述，并协助审查与修订部分数学论证。作者共同负责数学陈述及证明。其他命中为目录项、orbifold 记号及群分类符号。

来源：https://arxiv.org/pdf/2611.22293v1

[arXiv](https://arxiv.org/abs/2611.22293)

## Gradient estimate for $p$-heat equation on complete Riemannian manifold

Weihao Zheng

对完备流形上的方程 u^(p−2)∂ₜu=Δₚu，p>1，若 Ric≥−K 且 Q=Bₒ(R)×(t₀−T,t₀] 上 0<D₁≤u≤D₂，并且球不接触边界，则在半径和向后时间长度均减半的柱内，|∇u|/u≤C(n,p,D₂/D₁)(R⁻¹+T^(−1/p)+√K)。

We derive a Hamilton-type gradient estimate for positive solutions to the $p$-heat equation via the Moser iteration method. Our result relaxes the curvature assumption from sectional curvature to Ricci curvature. In addition, we obtain a Liouville-type theorem and a Harnack-type inequality as corollaries.

明确披露 AI 协作：作者披露生成式 AI 协助计算、核查与润色表述，未注明模型。声明将技术方法归于作者独立构思，并称作者检查所有计算和逻辑推导。

来源：https://arxiv.org/pdf/2611.22359v1 · PDF 第15–16页 Declaration / AI usage

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露生成式 AI 协助计算、核查与润色表述，未注明模型。声明将技术方法归于作者独立构思，并称作者检查所有计算和逻辑推导。

来源：https://arxiv.org/pdf/2611.22359v1

[arXiv](https://arxiv.org/abs/2611.22359)

## On the volume growth assumption in the Eulerian definition of RCD spaces

Marco Picerni

令(X,d)完备可分，m为全支撑Radon测度，假设无穷小Hilbert性质、Sobolev到Lipschitz性质及弱Bochner BE(K,∞)。给定任意基点x₀、满足闭球有限测度的局部半径r₀和t>0，取f=(1−d(·,x₀)/r₀)₊/2，则热流连续代表h_t f(x₀)>0，且对所有r>0有m(B_r(x₀))≤‖f‖₁[h_t f(x₀)]^{−2} exp(r²/[2I_K(t)])，其中I_K(t)=∫₀ᵗe^{2Ks}ds。因而有界集测度有限且空间满足RCD(K,∞)。

We prove that every infinitesimally Hilbertian metric measure space whose reference measure is a Radon measure, and which satisfies the Sobolev-to-Lipschitz property and the weak Bochner inequality with a lower Ricci bound, has Gaussian volume growth; in particular, balls have finite measure. Hence, in the Eulerian definition of $\mathsf{RCD}(K,\infty)$ spaces, both the volume growth assumption and the finiteness of the measure of balls are redundant. The proof combines the self-improvement of the Bakry--Émery gradient estimate, obtained without using the conservation of mass of the heat flow, with a dimension-free Harnack inequality derived from the Sobolev-to-Lipschitz property.

明确披露 AI 协作：第18页明确披露Claude Opus 5.5和Gemini 4 Argon协助发展、检查和排版部分论证，分别记录proofs、verification及writing。声明未指定由模型提出的具体主构思或关键论证路线。

来源：https://arxiv.org/pdf/2611.22383v1 · PDF第18页致谢段，全文19页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第18页明确披露Claude Opus 5.5和Gemini 4 Argon协助发展、检查和排版部分论证，分别记录proofs、verification及writing。声明未指定由模型提出的具体主构思或关键论证路线。

来源：https://arxiv.org/pdf/2611.22383v1

[arXiv](https://arxiv.org/abs/2611.22383)

## Equivariant Flow Matching on Homogeneous Spaces

Finn M. Sherry、Gijs Bellaard

将 Lie 群上的流匹配推广到齐性空间，从条件向量场构造免模拟的训练目标。作者推导连接两组位置与取向的生成元，并在 Lorentz 几何下对事件与速度空间作同样推导。

Flow matching enables the training of networks that can flow samples from an initial to a target distribution. The network is regressed against simple vector fields that are conditioned on end points in the target distribution. In the Euclidean case, these conditional vector fields induce flows along straight lines. Various generalisations have been proposed to perform flow matching on spaces where straight lines are not well-defined, such as Riemannian manifolds and Lie groups. Riemannian flow matching applies to many domains, but typically requires expensive simulation, while flow matching on Lie groups is simulation-free but only works on Lie groups. In this work, we develop equivariant flow matching on homogeneous spaces, which generalises flow matching on Lie groups, while remaining simulation-free. We also derive all generators connecting pairs of position-orientations, generalising, and perform a similar derivation for event-velocity space, the Lorentzian analogue of position-orientation space, so that we can perform flow matching on these spaces.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文相关命中指生成建模研究对象、Eindhoven AI Institute 的财务支持、流方程中群作用 gp_t 的符号和流匹配论文引文。标准、补充及元数据搜索未观察到作者自身使用 AI 作为研究或写作辅助的披露。

来源：https://arxiv.org/pdf/2611.22492v1

[arXiv](https://arxiv.org/abs/2611.22492)

## Remarks on uniqueness and nonuniqueness for the isotropic $L_p$-Minkowski problem with $p<-n$

YanNan Liu、Jian Lu

对 p<−n 的各向同性 Lₚ-Minkowski 问题，n≥3 时证明 p 略低于 −n 的唯一性，无需对称性。n≥8 时，在 p 略高于 −2n−3 的区间给即使在完整单纯形对称下也非唯一的结果。

We study uniqueness and nonuniqueness for the isotropic $L_p$-Minkowski problem with $p<-n$. For $n\geq3$, we prove uniqueness for $p$ just below $-n$ without any symmetry assumptions. Moreover, for $n\geq8$, we obtain nonuniqueness for $p$ just above $-2n-3$, even under full simplex symmetry. The proofs use the Chou-Wang obstruction and Lyapunov-Schmidt reduction.

明确披露 AI 协作：作者披露 ChatGPT 5.6 协助润色语言、数学表述以及审查选定证明和计算。作者称已独立审查和验证 AI 辅助内容。

来源：https://arxiv.org/pdf/2611.22527v1 · PDF 第17页 Declaration of AI Use

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露 ChatGPT 5.6 协助润色语言、数学表述以及审查选定证明和计算。作者称已独立审查和验证 AI 辅助内容。

来源：https://arxiv.org/pdf/2611.22527v1

[arXiv](https://arxiv.org/abs/2611.22527)

## Kähler metrics with varying cone angles and Ricci curvature

Martin de Borbon

设 β(w)>0 光滑，Kähler 度量在穿孔坐标邻域与法向锥角 2πβ(w) 的模型一致可比。若黎曼度量意义下 Ricci 曲率的平方积分有限，则 β 恒定。

We prove that the cone angle of a Kähler metric is constant if its Ricci curvature is locally in $L^2$. In particular, a Kähler--Einstein metric cannot have a varying cone angle. The proof is elementary and assumes only uniform comparison with the corresponding model.

明确披露 AI 协作：作者披露使用 ChatGPT 进行数学讨论、准备草稿和编辑，没有具体说明哪项数学论证由 AI 提出。

来源：https://arxiv.org/pdf/2611.22603v1 · PDF 第 4 页，Use of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露使用 ChatGPT 进行数学讨论、准备草稿和编辑，没有具体说明哪项数学论证由 AI 提出。

来源：https://arxiv.org/pdf/2611.22603v1

[arXiv](https://arxiv.org/abs/2611.22603)

## Almost-Global Coordinates on Matrix Manifolds

Bingjie Li、Jiaxiang Wang、Zhigang Yao

作者证明每个紧光滑流形在去掉一个闭零测集后可由Euclidean开域参数化，允许参数域不连通。进一步以Cayley变换、线性映射的图和分块Gauss消元，构造经典矩阵群、Stiefel流形、Grassmann流形及实旗流形的显式参数化，并给出逆映射、遗漏集的余维以及坐标中的Riemannian梯度和Haar积分公式。

We study global coordinates on smooth manifolds outside some closed subsets of measure zero. We first give an elementary proof that every compact smooth manifold admits such coordinates, allowing the Euclidean parameter domain to be disconnected. We then study parametrizations of classical matrix groups, Stiefel manifolds, Grassmannians and real flag manifolds. For these parametrizations, we describe the inverse maps and compute the codimensions of the omitted subsets. We construct these parametrizations using Cayley transforms, graphs of linear maps and block Gaussian elimination. We also give formulas for Riemannian gradients and Haar integrals in these coordinates.

明确披露 AI 协作：第42页披露Claude用于LaTeX编辑排版、语法及交叉引用和文字一致性检查、选定计算检查与书目细节核查，记录writing、verification及literature。作者说明数学结果、证明及例子由作者完成。其他候选来自all manifolds、as tr arctan等普通文字和数学记号拼接。

来源：https://arxiv.org/pdf/2611.22653v1 · PDF第42页Tool use，全文43页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第42页披露Claude用于LaTeX编辑排版、语法及交叉引用和文字一致性检查、选定计算检查与书目细节核查，记录writing、verification及literature。作者说明数学结果、证明及例子由作者完成。其他候选来自all manifolds、as tr arctan等普通文字和数学记号拼接。

来源：https://arxiv.org/pdf/2611.22653v1

[arXiv](https://arxiv.org/abs/2611.22653)

## The Minimal Background Period for Infinitely Many Spectral Gaps in Anderson-Bernoulli Models

Cong Chen、Yong Li

证明一维离散 Anderson–Bernoulli 算子若可在几乎必然谱中有无穷多个谱隙，最小背景周期是三。对显式周期三背景和耦合，任意非退化 Bernoulli 概率律均有无穷多个有界谱隙从右侧向一个谱能量聚集。该性质在背景与耦合参数的开集上保持。

We prove that three is the smallest background period for which a one-dimensional discrete Anderson-Bernoulli operator can have infinitely many gaps in its almost-sure spectrum. For an explicit period-three background and coupling, we construct infinitely many bounded gaps accumulating from the right at a spectral energy, for every nondegenerate Bernoulli law. This property persists on an open set of background and coupling parameters. The proof combines a transverse heteroclinic connection and invariant multicones with spectral points from periodic realizations. A strict geometric window permits integer scale matching, and the required parameter inequalities are verified by exact rational arithmetic.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。对本版本共37页的全文和候选元数据做标准及补充搜索，未观察到作者披露自身使用 AI。

来源：https://arxiv.org/pdf/2611.22703v1

[arXiv](https://arxiv.org/abs/2611.22703)

## Sharp Gaussian Brunn-Minkowski inequalities

Bader Ammari

定理1.1对各自 Gaussian 重心为零的凸集、任意正定协方差 Γ 与 Σᵢ、两组正权重 λᵢ 与 λ̃ᵢ，给出多集合 Gaussian Brunn–Minkowski 的最优常数。它是在各线性子空间 E 上取最大值，项为 ∏(λ̃ᵢ/λᵢ)^(dim(E)λ̃ᵢ) 乘以 [det Γ_E / ∏det((Σᵢ)_E)^λ̃ᵢ]^(1/2)，其中下标 E 表示正交压缩，E={0} 项为 1。

We prove Gaussian Brunn-Minkowski inequalities for multiple sets. These are of the type: $$\prod_{i=1}^I \gamma_{\Sigma_i}(K_i)^{\tilde \lambda_i} \le C_{\text{sharp}}\gamma_\Gamma\Big(\sum_{i=1}^I \lambda_i K_i\Big),$$ with convex sets $K_i \subset \mathbb{R}^n$, whose barycenter $b_{K_i,\Sigma_i}$ with respect to the Gaussian measure $\gamma_{\Sigma_i}$ is zero, where $\lambda_i, \tilde \lambda_i \in (0;1)$ such that $\sum_{i=1}^I \lambda_i=\sum_{i=1}^I \tilde \lambda_i=1.$ In addition, we provide natural conditions on the matrices $\Gamma, \Sigma_1,\cdots,\Sigma_I \in \mathrm{Sym}_{>0}(n)$, which are given through a pointwise inequality involving the Karcher mean. Furthermore, we study equality cases of the corresponding functional forms in such situations. We also investigate the role of centering in the (B)-property by giving a counterexample for convex bodies with zero Lebesgue barycenters in dimensions at least three and thereby answering negatively a question of Faifman-Polterovich in \cite{Faifman_Polt}. Finally, a new slicing approach is introduced, which allows us to pass from centered convex sets to sets with arbitrary barycenters such that their weighted sum is convex. Based on this idea, we show a new Gaussian Brunn-Minkowski inequality $$e^{|\sum_{i=1}^I \lambda_i b_{K_i,I_n}|^2/2n} \gamma_n \Big(\sum_{i=1}^I \lambda_i K_i \Big)^{1/n} \ge \sum_{i=1}^I \lambda_i e^{|b_{K_i,I_n}|^2/2n} \gamma_n(K_i)^{1/n},$$ and consider a further application in the direction of the Gaussian correlation inequality, together with the rigidity for both inequalities.

明确披露 AI 协作：作者披露定理3.14的证明由未具名商业 AI 工具提出，后由作者核查和重写。第2页与第40页的 OpenAI 命中指向外部对数 Brunn–Minkowski 预印本，和定理3.14的披露分开。

来源：https://arxiv.org/pdf/2611.22749v1 · PDF 第38页 Acknowledgements / AI Usage

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露定理3.14的证明由未具名商业 AI 工具提出，后由作者核查和重写。第2页与第40页的 OpenAI 命中指向外部对数 Brunn–Minkowski 预印本，和定理3.14的披露分开。

来源：https://arxiv.org/pdf/2611.22749v1

[arXiv](https://arxiv.org/abs/2611.22749)

## Structured Design of Layered Sparse Unitary Space-Time Modulation for Integrated Noncoherent and Coherent MIMO Communications

Álvaro Pendás-Recondo、Enrique Pendás-Recondo、Rafael González Ayestarán、Jesús Alberto López-Fernández、Ignacio Santamaria

作者面向非相干与相干一体化MIMO通信提出稀疏酉空时星座。非相干层编码Grassmann流形上的子空间，相干层区分各子空间的Stiefel基代表，第二层保留原有每行单非零项的稀疏性。采用两层顺序解码以减少计算，并用BER、SER数值结果检验设计。

This work presents a novel structured constellation design based on unitary space-time modulation (USTM) for integrated noncoherent and coherent multiple-input multiple-output (MIMO) communications. Information is encoded into the sparse space-time matrices through two layers: a noncoherent layer that distinguishes points on the Grassmann manifold (subspaces) and a coherent layer that distinguishes among the Stiefel representatives associated with each of those points (bases for the subspaces). We consider sequential decoding of the two layers to reduce computational complexity, while explicitly identifying the matrix structures that favor this decoding strategy. The proposed constellation builds on a previous structured Grassmannian signaling design, which has the remarkable property of producing space-time matrices with a single nonzero entry per row, while introducing a novel systematic design for the second layer corresponding to the Stiefel representatives. The design of the second layer preserves the sparsity of the first layer and significantly reduces the decoding computational complexity, while ensuring reliable performance under sequential decoding and enabling a simple yet effective bit labeling, as validated by numerical results in terms of bit error rate (BER) and symbol error rate (SER). Numerical results also show graceful performance degradation under channel correlation and, for limited coherence intervals where channel state information at the receiver (CSIR) can be estimated only imperfectly, improved performance compared with classical space-time block coding (STBC) schemes based on QAM and PSK.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。全文原检索及扩展补检未见作者AI使用披露。第3、4、6页llm候选来自all matrices或all m等文字与符号拼接，第12页Astra来自A straightforward。复查结论及参考文献。

来源：https://arxiv.org/pdf/2611.22763v1

[arXiv](https://arxiv.org/abs/2611.22763)

## Lagrangian structures, $r$-matrices and Poisson brackets

Daniel Álvarez

统一处理两类 Poisson 构造，即广义动力 r 矩阵与拟三角 Lie 双代数作用的耦合，以及结合两个 Poisson 作用的混合积。输入 Lie 代数胚可积时，对带移位 Lagrangian 结构的 Lie 群胚态射取纤维积，构造相应辛群胚。

We give a global conceptual viewpoint of two constructions of Poisson structures involving $r$-matrices: the first one concerns coupling of generalized dynamical $r$-matrices with actions of quasi-triangular Lie bialgebras, the second one is given by the mixed products of Poisson spaces, which combine two Poisson actions of a quasi-triangular Lie bialgebra to create a new one. When the input Lie algebroids are integrable, we construct symplectic groupoids for both types of Poisson structures by taking fibred products of Lie groupoid morphisms equipped with shifted lagrangian structures. We illustrate our results with explicit examples coming from Lie theory and moduli spaces of flat bundles over surfaces.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。本版本15页全文及候选元数据的标准和补充搜索未见作者使用 AI 的披露。第4页致谢记录与 H. Bursztyn、M. Cueca 和 M. Mol 的讨论。

来源：https://arxiv.org/pdf/2611.22832v1

[arXiv](https://arxiv.org/abs/2611.22832)

## Symphonic Joins and Finite-Product Hopf Constructions

Xiangzhi Cao

固定闭黎曼流形有限乘积的角向映射，研究连接目标两极的约化能量。在线性塌缩下，无穷小能量恰发生于某端塌缩维数和大于 3，或等于 3 且该塌缩块的角密度消失时。

We study how collapse at the ends of a warped product affects symphonic joins and Hopf constructions. For a Hopf construction with a fixed angular map on a finite product of closed Riemannian manifolds, we characterize when the reduced energy has infimum zero among functions connecting the two target poles. Under linear collapse this occurs precisely when, at some end, the collapsing factors have total dimension greater than three, or have total dimension three and vanishing angular density on the collapsing block. In either case the infimum is unattained. For ellipsoidal joins with nonconstant spherical factor maps, smooth extension of a connecting symphonic join forces each factor map to be the restriction of a linear isometric embedding. We also derive the coupled equations for orthogonally split targets, establish a convexity criterion for minimizing separated joins, and construct smooth quaternionic examples with all angular factors active.

明确披露 AI 协作：作者披露生成式 AI（包括 OpenAI Codex）用于发展和修订论证、编辑、核查部分公式和文献，以及为若干命题准备 Lean 证明。作者并交代早期工作[2]完成后才用 ChatGPT 改进。第5页 AI 的命中是以 I 为分量指标的方程符号。

来源：https://arxiv.org/pdf/2611.22845v1 · PDF 第50页 AI assistance

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露生成式 AI（包括 OpenAI Codex）用于发展和修订论证、编辑、核查部分公式和文献，以及为若干命题准备 Lean 证明。作者并交代早期工作[2]完成后才用 ChatGPT 改进。第5页 AI 的命中是以 I 为分量指标的方程符号。

来源：https://arxiv.org/pdf/2611.22845v1

[arXiv](https://arxiv.org/abs/2611.22845)

## Positivity of minimal volume entropy for some closed manifolds with zero simplicial volume

Inkang Kim、Xueyuan Wan

对每个整数m≥4，作者构造闭连通定向光滑m维流形，使其单纯形体积为零而极小体积熵为正，否定归于Gromov的蕴含问题。每个反例都有一个连通正则五重覆盖，其极小体积熵为零。

For every integer $m\ge4$, we construct a closed connected oriented smooth $m$-manifold whose simplicial volume is zero and whose minimal volume entropy is positive. This answers negatively the question, attributed to Gromov, whether vanishing simplicial volume implies vanishing minimal volume entropy. Each example has a connected regular five-sheeted covering with zero minimal volume entropy, so vanishing of this invariant does not descend through finite coverings.

明确披露 AI 协作：第22页明确披露使用ChatGPT查找参考文献、数学定义和例子并协助英文排版，记录literature、exploration及writing。作者声明对所有数学论证和内容负责，未具体归因核心反例构造。第1–2页Gemini候选来自large minimal，第22页llm来自普通词组及参考文献Ballmann。

来源：https://arxiv.org/pdf/2611.22863v1 · PDF第22页AI Declaration，全文23页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第22页明确披露使用ChatGPT查找参考文献、数学定义和例子并协助英文排版，记录literature、exploration及writing。作者声明对所有数学论证和内容负责，未具体归因核心反例构造。第1–2页Gemini候选来自large minimal，第22页llm来自普通词组及参考文献Ballmann。

来源：https://arxiv.org/pdf/2611.22863v1

[arXiv](https://arxiv.org/abs/2611.22863)

## Rank-sensitive Hodge bounds for symphonic energy and minimizers on sheared tori

Xiangzhi Cao

对闭源，记 β=u*ω，η 为其闭二形式上同调类的调和代表，E_sym=∫tr((du·du*)²)/4。若 β 的秩几乎处处至多 2r，定理4.1以余闭 ψ 的最大 r 个斜标准块的平方积分 T_r(ψ) 做分母，给 2F_ω(u)≥|〈η,ψ〉|²/T_r(ψ)，其中 F_ω=‖β‖²/2。命题4.3的优化界严格超过 ‖η‖² 当且仅当 η 在正测度集上超过秩 2r。指定剪切四环面投影在其同伦类的 E_sym 最小值为 1/2，除目标平移外唯一，与 Hodge 下界的差为 b²V/[2(1+b²)(1+V)]。

We ask how far the minimum of symphonic energy in a homotopy class can exceed the Hodge lower bound from a pulled-back two-form. For projections from a family of sheared four-tori to the flat two-torus, we compute the minimum and the gap for every smooth shear profile. The gap depends on the variance of the profile. Attainment of the projection's pullback area energy by a coclosed test depends on its oscillation. We determine exactly which variances allow two profiles with the same positive gap and different outcomes for this test, and compute the convex relaxation beyond the oscillation threshold. In arbitrary source dimension the optimized test improves the Hodge bound precisely when the harmonic representative exceeds the rank allowed for the pullback on a set of positive measure. We also prove low-degree cohomology estimates, a sharp universal degree exponent for targets detected by low-degree cup products, and an exact defect identity that forces an immersed source to be symplectic at equality.

明确披露 AI 协作：第10页明确把 OpenAI ChatGPT（Codex）用于发展秩估计和剪切环面例，也用于起草及修订证明、检索文献和准备稿件。作者说明数学论证不依赖数值证据。

来源：https://arxiv.org/pdf/2611.22865v1 · PDF 第10页，Use of computational assistance

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第10页明确把 OpenAI ChatGPT（Codex）用于发展秩估计和剪切环面例，也用于起草及修订证明、检索文献和准备稿件。作者说明数学论证不依赖数值证据。

来源：https://arxiv.org/pdf/2611.22865v1

[arXiv](https://arxiv.org/abs/2611.22865)

## Round hyperspheres uniquely minimize most tangent-point energies

Alexander Dohmen、Heiko von der Mosel

对有界 Caccioppoli 集边界的一大类广义 tangent-point 能量，在固定周长或固定体积下给尖锐下界。闭 C¹ 超曲面也在覆盖范围内。

We show that round hyperspheres uniquely minimize a broad class of generalized tangent-point energies among all boundaries of bounded Caccioppoli sets sharing the same perimeter or enclosed volume. This includes closed $C^1$-hypersurfaces. Equivalently, we establish sharp lower bounds for the associated scale-invariant ratios of energy to surface measure and energy to volume, respectively, with equality precisely for round spheres.

明确披露 AI 协作：作者披露 ChatGPT 帮助找到用于证明定理4.4的定理A.1凸分析论证，其他 AI 使用限于核查稿件证明。声明将推广至任意有限周长集的启发归于施文慧的意见。

来源：https://arxiv.org/pdf/2611.22920v1 · PDF 第26页 Acknowledgments

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露 ChatGPT 帮助找到用于证明定理4.4的定理A.1凸分析论证，其他 AI 使用限于核查稿件证明。声明将推广至任意有限周长集的启发归于施文慧的意见。

来源：https://arxiv.org/pdf/2611.22920v1

[arXiv](https://arxiv.org/abs/2611.22920)

## Pluricanonical locally conformally almost Kähler metrics, circle-invariant $G_2$ structures, and Laplacian flows

Mehdi Lejmi

设紧七维流形具局部共形平行G₂结构和非零平行Lee形式。若自由圆作用保持结构、轨道等长且正交于Lee场，则六维商具有pluricanonical局部共形几乎Kähler结构、平行Lee形式及不可积几乎复结构，上下基本形式为Hodge Laplacian本征形式并有显式本征值比。固定归一化SU(3)补全时，作者刻画圆不变局部共形平行提升的曲率。提升方程迫使pluricanonical底流形的Lee形式局部平行并排除严格可积底空间。

We study explicit Hodge evolutions of pluricanonical locally conformally almost Kähler metrics and their relation to locally conformal parallel $G_2$ structures. A compact locally conformal parallel $7$-manifold with a parallel non-zero Lee form, carrying a structure-preserving free circle action of constant orbit length orthogonal to the Lee field, has a $6$-dimensional quotient which is pluricanonical with a parallel Lee form and a non-integrable almost complex structure. The fundamental forms upstairs and downstairs are Laplacian eigenforms with an explicit eigenvalue ratio. Conversely, for a fixed normalized $SU(3)$ completion, we characterize the curvature of a circle-invariant locally conformal parallel lift. The lift equations force a pluricanonical base to have parallel Lee form, even locally, and exclude strict integrable pluricanonical bases. Independently, the pluricanonical eigenform identity gives a shrinking solution of He's full Hodge equation and an immortal $d^*d$ solution contracting the Lee plane.

明确披露 AI 协作：第3页作者披露ChatGPT 6.1 Sol检查常规计算并改善文章表述，记录verification及writing。作者说明数学思想、证明路线与结果由作者完成，致谢中使用的直接第一类LCS构造建议来自Tedi Drăghici。

来源：https://arxiv.org/pdf/2611.22931v1 · PDF第3页Declaration of AI assistance，全文11页。

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第3页作者披露ChatGPT 6.1 Sol检查常规计算并改善文章表述，记录verification及writing。作者说明数学思想、证明路线与结果由作者完成，致谢中使用的直接第一类LCS构造建议来自Tedi Drăghici。

来源：https://arxiv.org/pdf/2611.22931v1

[arXiv](https://arxiv.org/abs/2611.22931)

## Banchoff Curvature and Realisation Moduli of Piecewise-Affine Arrangement Immersions

William Nelson

研究 ℝᴰ 到 ℝⁿ 的分片仿射浸入。横向折痕锥嵌入时，指定凸坐标平滑的 Gauss–Bonnet–Chern 密度在横向切片归约为 Hafnian，并在偶余维平坦上积分出 Banchoff 临界点曲率。作者将该曲率与 Cheeger–Müller–Schrader 密度及由入射室度量 Schur 补确定的 Gaussian 正交象限概率交替和联系起来。

We compute the curvature concentrated on the flats of a piecewise-affine immersion of $\mathbb{R}^D$ into $\mathbb{R}^n$ creased along an affine hyperplane arrangement, and parametrise the immersions sharing its chamber metrics. Suppose every transverse crease cone is embedded (the positive-path-rank condition). Then the Gauss-Bonnet-Chern density of any convex coordinate-wise smoothing that is affine outside a compact transition zone reduces, on each transverse slice, to a Hafnian. This Hafnian integrates to Banchoff's critical-point curvature on each even-codimension flat. The curvature coincides with the Cheeger-Müller-Schrader density and equals an alternating sum of Gaussian orthant probabilities determined by Schur complements of the incident chamber metrics. In even dimension, under mild non-degeneracy, total vertex curvature equals the recession curvature at infinity and is unchanged when the walls are translated, even across multi-wall collisions. Under generic codimension-two intersections, realisations with prescribed chamber metrics form a compact rank-constrained spectrahedron of generic local dimension $\max(0,H-r(r+1)/2)$, where $r = \max(0,D+H-n)$. At minimal target dimension the given immersion is the unique realisation preserving orientation across each single wall, and a positive semidefinite stress matrix certifies universal rigidity.

明确披露 AI 协作：第35页说明作者用 Google Gemini 和 Anthropic Claude 起草、编辑文字，按作者的数学提纲起草与压缩证明表述，组织结构及内部检查错误。作者声明逐行独立核对定义、定理、构造和证明。第1页 Google DeepMind 是机构署名，第43页 A. I. 是参考文献作者姓名首字母。

来源：https://arxiv.org/pdf/2611.22976v1 · PDF 第35页，AI use declaration

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第35页说明作者用 Google Gemini 和 Anthropic Claude 起草、编辑文字，按作者的数学提纲起草与压缩证明表述，组织结构及内部检查错误。作者声明逐行独立核对定义、定理、构造和证明。第1页 Google DeepMind 是机构署名，第43页 A. I. 是参考文献作者姓名首字母。

来源：https://arxiv.org/pdf/2611.22976v1

[arXiv](https://arxiv.org/abs/2611.22976)

## First Order Geometry of Equilateral Small Polygons

José Ayala Hoffmann、Tomás Ayala Coppola

等边约束与取到直径的点对给线性化可行锥。若乘子平衡成立且活跃直径乘子严格正，活跃等式空间又只含无穷小欧氏运动，则周长在模欧氏运动后严格局部极大。

We develop a first order calculus based on the geometry of realised diameter graphs for perimeter maximisation among convex equilateral small polygons. Polygon side equalities and active diameter constraints define a linearised feasible cone and an associated equality space. We prove that an equilateral small polygon is a strict local maximiser of perimeter modulo Euclidean motions if a multiplier balance holds with strictly positive active diameter multipliers and the active equality space consists only of infinitesimal Euclidean motions. The proof uses a local Euclidean slice and a geometric limiting argument and requires neither independence of the active constraint gradients nor second order information. As an application, we combine our criterion with validated interval arithmetic to establish strict local maximality for Bingane and Audet's polygons $A_{16}$, $A_{32}$, $A_{64}$ and for reconstructions of their polygons $Z_{32}$ and $Z_{64}$. For each $n\in\{32,64\}$, the perimeter of $Z_n$ is strictly larger than that of $A_n$. Thus, strict local maximisers with different perimeters coexist in the space of convex equilateral small polygons with the same number of sides.

明确披露 AI 协作：作者披露以自身问题和猜想引导 ChatGPT 与 Claude 探索定理3.5及6.4的论证，协助开发与核查精确代数、区间算术、乘子正性、刚性和 Lean 4 形式化流程，并查找潜在缺口、建议修正、检索文献和协助 LaTeX 与编辑。作者称已核查最终稿采用的论证及计算。

来源：https://arxiv.org/pdf/2611.23066v1 · PDF 第15–16页 Acknowledgements

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者披露以自身问题和猜想引导 ChatGPT 与 Claude 探索定理3.5及6.4的论证，协助开发与核查精确代数、区间算术、乘子正性、刚性和 Lean 4 形式化流程，并查找潜在缺口、建议修正、检索文献和协助 LaTeX 与编辑。作者称已核查最终稿采用的论证及计算。

来源：https://arxiv.org/pdf/2611.23066v1

[arXiv](https://arxiv.org/abs/2611.23066)

## Regularity of solutions to complex Monge-Ampère equations in big classes

Riley Guyett、Ryan Mc Gowan

在紧致 Kähler 流形的大类上，设 U 为去掉真解析子集 Z 后的开集，且位于 ample locus 且有规定解析奇点的 Kähler 势垒。密度 f∈Lᵖ（p>1）全质量且在 U 为正；若 F=log f 局部 C⁰,β 且满足两项二阶条件之一，归一化非多极解在 U 局部 C²,α（0<α<β）。

We study the non-pluripolar complex Monge-Ampère equation in an arbitrary big class on a compact Kähler manifold. Under a weighted Laplacian lower bound on the log density, we obtain local $C^{2,\alpha}$ regularity on the part of the ample locus where the data satisfy the stated hypotheses. A second criterion based on a quasi-plurisubharmonic decomposition gives similar regularity. In particular, a smooth positive density gives a smooth solution on the ample locus. None of these regularity results require nefness of the background class, resolving positively a question of Dinew, Guedj, and Zeriahi.

明确披露 AI 协作：作者先提出用 Dirichlet 问题及解析耗尽近似全局方程。披露称 ChatGPT Sol 完成光滑正密度情形的证明，作者随后修订并核对。该说明限定于光滑正密度情形。

来源：https://arxiv.org/pdf/2611.23094v1 · PDF 第 4 页，AI Declaration

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者先提出用 Dirichlet 问题及解析耗尽近似全局方程。披露称 ChatGPT Sol 完成光滑正密度情形的证明，作者随后修订并核对。该说明限定于光滑正密度情形。

来源：https://arxiv.org/pdf/2611.23094v1

[arXiv](https://arxiv.org/abs/2611.23094)
