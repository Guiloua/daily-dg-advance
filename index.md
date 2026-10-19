# 几何前沿日报 · 2026-10-19

已收录 41/41 · 解读 41/41。

## Gluons and Knots

Alfredo Guevara

把单负螺旋胶子振幅的分室常值、墙穿越和软定理与链环的 skein 关系及 Reidemeister 变换联系，以 HOMFLY-PT 多项式的角项构造状态计数公式。

We argue that the scattering amplitude of a single minus helicity gluon with arbitrarily many positive helicity gluons is topological. The amplitude is constant in chambers of kinematic space, its resonances are located at walls and its factorization is determined by wall-crossing. Yangian invariance dictates the amplitude to be determined by a 2d null Wilson loop that can be lifted into a positive and transverse 3d link. By reinterpreting wall-crossing and the Weinberg soft theorem as skein relations and Reidemeister moves of the subknots, we construct a state-counting description consisting of adding the `corners' of their HOMFLY-PT polynomials. Beyond the classical limit, we argue that this provides a conjectured but precise connection to topological field and string theory. The new formula is rigorously derived via a Lean-formalized dependency graph (DAG) as detailed in a companion paper, laying out the precise assumptions including Reidemeister III invariance. It is further tested exhaustively, including novel `star' kinematics where the amplitude and state count are shown to become Catalan numbers, in agreement with knot theory literature.

明确披露 AI 协作：致谢明确将式 (28) 的初始结构形式归于自动化 AI 研究系统 Black-Box-Arena；作者说明原公式有误，之后由其修补细节并给出本文解释，另感谢多个机构提供 AI 辅助。记录公式思路与研究探索，不把有误的初稿写成已由 AI 正确证明。

来源：https://arxiv.org/pdf/2610.10673v1 · PDF 第 11 页右栏，Acknowledgements

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢明确将式 (28) 的初始结构形式归于自动化 AI 研究系统 Black-Box-Arena；作者说明原公式有误，之后由其修补细节并给出本文解释，另感谢多个机构提供 AI 辅助。记录公式思路与研究探索，不把有误的初稿写成已由 AI 正确证明。

来源：https://arxiv.org/pdf/2610.10673v1

[arXiv](https://arxiv.org/abs/2610.10673)

## Solvability of complex Hessian equations corresponding to right-Noetherian polynomials

Junbang Liu、Yulun Xu

在紧 Hermitian 流形上，用径向归一化研究对应右 Noetherian 多项式的 form-type 复 Hessian 方程，允许系数随位置变化，以径向斜率处的 C-subsolution 刻画可解性。

On compact Hermitian manifolds, we establish a framework using radial normalization for the solvability of complex Hessian equation in form type, corresponding to right-Noetherian polynomials whose coefficients may not be constant functions. The solvability of a radial normalized equation is characterized by the existence of a C-subsolution at radial slope, which extends the results of Guo-Song to this setting.

明确披露 AI 协作：工具披露说明 ChatGPT 6-Astra 用于文献综述、对抗性审读和论证文字改善，并建议将式 (18) 用于径向归一化。记录这一明确的研究路线建议及文献、检查和写作辅助；作者仍承担结果正确性责任。

来源：https://arxiv.org/pdf/2610.22524v1 · PDF 第 5 页，Tool and computational resource disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。工具披露说明 ChatGPT 6-Astra 用于文献综述、对抗性审读和论证文字改善，并建议将式 (18) 用于径向归一化。记录这一明确的研究路线建议及文献、检查和写作辅助；作者仍承担结果正确性责任。

来源：https://arxiv.org/pdf/2610.22524v1

[arXiv](https://arxiv.org/abs/2610.22524)

## Computing Fréchet on Unknown Submanifolds of Riemannian Manifolds

Ian McPherson、Mauro Maggioni

仅用未知紧嵌入流形的局部采样器和观测距离，自适应建图逼近测地插值并计算内蕴 Fréchet 均值；在所述假设下获得期望目标差 O(1/T)，采样量至多为 T^(4d+3) 的对数量级修正。

Empirical averages are fundamental statistical primitives. On nonlinear spaces, their generalization, the Fréchet mean, generally lacks a closed-form solution, and its computation requires solving an optimization problem. We study the computation of intrinsic Fréchet means for data supported on an unknown compact $d$-dimensional Riemannian manifold $M_{1}$ embedded in an ambient metric space $(X,d_{\operatorname{obs}})$. Such settings arise when observations are better represented in non-Euclidean spaces, like probability distributions in Wasserstein space. We assume access only to a local sampler on $M_{1}$ and the observation metric $d_{\operatorname{obs}}$, without knowledge of its intrinsic geometry. We propose a graph-based iterative algorithm that adaptively samples the manifold and approximates geodesic interpolation. Under mild assumptions, we establish an $O(1/T)$ expected objective gap guarantee using at most $\widetilde{O}(T^{4d+3})$ sampled points. As a byproduct of our analysis we extend the metric equivalence guarantees of ISOMAP from Euclidean to Riemannian ambient spaces, which may be of independent interest. Numerical experiments demonstrate the effectiveness of our method for computing intrinsic averages on unknown data manifolds.

明确披露 AI 协作：作者说明主要数学想法、结果和证明已有初稿；后续 ChatGPT 辅助证明检查、识别并移除不必要假设及语言表述，Codex 将旧数值代码推广至任意环境空间。全部修改由作者审核，不能把这些辅助用途写成 AI 提供原始核心想法。

来源：https://arxiv.org/pdf/2610.22592v1 · PDF 第 35–36 页，Declaration of Generative AI Use

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者说明主要数学想法、结果和证明已有初稿；后续 ChatGPT 辅助证明检查、识别并移除不必要假设及语言表述，Codex 将旧数值代码推广至任意环境空间。全部修改由作者审核，不能把这些辅助用途写成 AI 提供原始核心想法。

来源：https://arxiv.org/pdf/2610.22592v1

[arXiv](https://arxiv.org/abs/2610.22592)

## Axis-parallel square packing with an exact formula for optimal packing of seven squares

Matthew Badger

对指定边长、轴平行的小正方形，给出至七个时最小容纳正方形边长的精确公式及匹配下界；对任意 n≥6，最优值为至多 n−3 个输入边长之和，并得到最优欧氏 Lipschitz 常数 √(n−3)。

How large a square is needed to hold axis-parallel squares of prescribed side lengths? We give exact formulas for the optimal side through seven squares, with explicit constructions and geometric lower-bound proofs. For every $n\ge6$, the optimum for $n$ squares is a sum of at most $n-3$ of the prescribed side lengths. This bound is sharp on an open set of side lengths and yields the optimal Euclidean Lipschitz constant $\sqrt{n-3}$ of the optimum as a function of the $n$ side lengths.

明确披露 AI 协作：作者明确披露 Claude Opus 4.8 实现精确求解与穷举、给出候选反例，并辅助完善作者设计的下界证明；后续 Claude Opus 5.5 与 GPT-6 Astra Pro 审读论证、改善表述，Claude 另辅助排版、制图和精确算术检查。候选排列与主要下界方法由作者提出。

来源：https://arxiv.org/pdf/2610.22622v1 · PDF 第 23–24 页，Acknowledgement of AI assistance

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者明确披露 Claude Opus 4.8 实现精确求解与穷举、给出候选反例，并辅助完善作者设计的下界证明；后续 Claude Opus 5.5 与 GPT-6 Astra Pro 审读论证、改善表述，Claude 另辅助排版、制图和精确算术检查。候选排列与主要下界方法由作者提出。

来源：https://arxiv.org/pdf/2610.22622v1

[arXiv](https://arxiv.org/abs/2610.22622)

## Transposed Poisson structures in graded and algebroid geometry

Gianmarco La Rosa

研究转置 Leibniz 法则在分次移位和 algebroid 化后能否保持，证明奇偶次数产生不同结构；分类有单位元的转置 F-algebroid，并对通常 Gerstenhaber 与切 F-algebroid 给出强限制。

We ask whether the transposed Leibniz rule $2z\cdot[x,y]=[z\cdot x,y]+[x,z\cdot y]$ survives the two passages that turn Poisson algebras into geometry, the shift of degree which produces Gerstenhaber algebras and the passage from algebras to algebroids. We introduce graded transposed Poisson algebras with a bracket of arbitrary degree and show that the parity of the degree decides which shape the answer takes. In even degree, over a unital base, such brackets are in bijection with homogeneous derivations, and on the exterior algebra of a vector bundle in degree zero they are exactly the gauge derivations of the bundle. In odd degree the bracket is forced to be the product with a single element of that degree, so a non-negatively graded algebra carries no non-zero transposed Gerstenhaber bracket. In particular, for a Lie--Rinehart algebra $(A,L)$, the Schouten--Rinehart Gerstenhaber algebra $\Lambda_A L$ is transposed if and only if the anchor and the bracket of $L$ both vanish. We then introduce transposed $F$-algebroids and classify those with an identity: if the rank is at least two the anchor vanishes and the structure is the datum of a derivation of the multiplication, while if the rank is one the bundle is trivialised by the identity and the structure is, globally, the Jacobi bracket of a single vector field. For the tangent $F$-algebroid of an $F$-manifold $M$ this forces $\dim M=1$.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。唯一命中为参考文献中数学家 Jean-Claude Herz 的姓名，不是 Claude 工具使用声明。核对全文候选段落后未观察到正面 AI 协作披露。

来源：https://arxiv.org/pdf/2610.22629v1

[arXiv](https://arxiv.org/abs/2610.22629)

## Maximizing the spectral gap for free bosonic CFTs

Hyeongjoe Chu、Yuchan Jung

用低维正交群的例外同构证明 Narain CFT 在 c=2、3 时谱隙分别不超过 2/3、3/4，并刻画 WZW 等号模型；更高 c 中以算术障碍和计算辅助分类筛选 Euclidean 格。

We study the spectral gap $\Delta_1$ of Narain CFTs, the smallest scaling dimension of a nonvacuum $U(1)^c_L\times U(1)^c_R$ primary, as a function on the Narain moduli space. Using the exceptional isomorphisms for $SO^+(2,2)$ and $SO^+(3,3)$, we prove the sharp bounds $\Delta_1\le 2/3$ at $c=2$ and $\Delta_1\le 3/4$ at $c=3$, with equality exactly at the $SU(3)_1$ and $SU(4)_1$ WZW models up to $O(c)\times O(c)$, and we describe local maxima of $\Delta_1$. For $4\le c\le 12$, we compare the Narain moduli space with the densest known Euclidean lattices: an arithmetic obstruction excludes five candidates, a computer-assisted classification shows that $E_8$, $K_{12}$, and $BW_{16}$ each admit a unique Narain structure up to lattice automorphisms, and a conceptual argument excludes the Leech lattice.

明确披露 AI 协作：致谢明确披露 Claude Opus 5.5 辅助编辑表述与 LaTeX、建议论文组织、检查证明严谨性并提出若干辅助步骤论证。作者独立核验数学内容、计算及引用，未将主要核心想法归因于 AI。

来源：https://arxiv.org/pdf/2610.22633v1 · PDF 第 20 页，Acknowledgments

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢明确披露 Claude Opus 5.5 辅助编辑表述与 LaTeX、建议论文组织、检查证明严谨性并提出若干辅助步骤论证。作者独立核验数学内容、计算及引用，未将主要核心想法归因于 AI。

来源：https://arxiv.org/pdf/2610.22633v1

[arXiv](https://arxiv.org/abs/2610.22633)

## Rational decomposition of polyhedra and a conjecture of Brlek and Reutenauer

Flavio D'Alessandro、Paolo Papi

作者证明 Brlek–Reutenauer 关于无歧义有理集与多面体示性函数代数赋值理论之间联系的猜想。

We prove in the affirmative a conjecture of Brlek and Reutenauer (2003), which relates unambiguous rational sets to a well known result due to Khovanskii and Pukhlikov (1992) and independently to Lawrence (1990) on the valuations of the algebra spanned by the indicator functions of polyhedra.

明确披露 AI 协作：披露说明使用生成式 AI 将结果与既有文献进行交叉核对，并由作者承担最终内容责任；没有说明模型或 AI 生成新证明。

来源：https://arxiv.org/pdf/2610.22663v1 · PDF 第 18 页，AI-generated content disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。披露说明使用生成式 AI 将结果与既有文献进行交叉核对，并由作者承担最终内容责任；没有说明模型或 AI 生成新证明。

来源：https://arxiv.org/pdf/2610.22663v1

[arXiv](https://arxiv.org/abs/2610.22663)

## Cross-ratios and first order ordinary differential equations

Oumar Wone

研究微分域上多项式一阶 ODE 解的交比，给出 n≥3 时交比通常不恒定的障碍；对可分多项式构造以各根为解的唯一相应一阶方程。

We investigate the usefulness of the cross-ratio in the study of first order odes of the form $y^\prime=P_ny^n+P_{n-1}y^{n-1}+\ldots+P_1y+P_0,\;\; (P_i)_{0\leqslant i\leqslant n}\in K,\;n\geqslant1$, where $K$ is a differential field of characteristic zero with algebraically closed field of constants. We discover along the way many differential algebraic identity between solutions to that equation. We also explain why the cross-ratio of any four solutions to such an equation is in general not constant when $n\geq3$ by exhibiting an obstruction which prevents its constancy when $n\geq3$. Finally to any separable polynomial $P_\varphi(z)=z^{n+1}+\varphi_1z^n+\varphi_2z^{n-1}+\ldots+\varphi_{n+1}$, $n\geq2$, over a differential field of meromorphic function on some domain of $\mathbb C$ with the usual derivation we associate a uniquely defined first order ode of the form $y^\prime=P_ny^n+P_{n-1}y^{n-1}+\ldots+P_1y+P_0,\;\; (P_i)_{0\leqslant i\leqslant n}\in K$ such that every root of $P_\varphi(z)$ is a solution to the said differential equation.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.22712v1

[arXiv](https://arxiv.org/abs/2610.22712)

## An Adjoint Criterion for Left-Invariant $m$-Modified Conformal Vector Fields on Even-Dimensional Lie Groups

Zhigang Li、Shaoqiang Deng、Hui Zhang

在偶数维实李代数上，以某个伴随算子有非零实特征值刻画非零左不变 m-modified conformal 场对某个非退化度量的存在，给出中性签名解和四维分类；一般不定号流形中该类场强迫零测地不完备。

For a fixed positive real constant $m$, a real Lie algebra of even dimension $2k$ admits a nonzero left-invariant $m$-modified conformal vector field for some nondegenerate metric if and only if an adjoint operator has a nonzero real eigenvalue. In that case, a solution exists with neutral signature $(k,k)$ and zero conformal factor. As an application, we classify the admissible four-dimensional Lie algebras and metric signatures; the only Lorentzian exceptions among the admissible algebras are $\mathfrak{aff}(\mathbb{C})$ and the diamond algebra. On a pseudo-Riemannian manifold of arbitrary indefinite signature, a nonzero $m$-modified conformal vector field forces lightlike geodesic incompleteness, even when its conformal factor is variable.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.22759v1

[arXiv](https://arxiv.org/abs/2610.22759)

## The Involution Rank of $\MCG(Σ_3)$ Is Four

Qilong Guo、Dongqi Sun

证明闭 genus 三曲面的映射类群可由四个 involution 生成而不能由三个生成，确定其 involution rank 为四。

For the closed orientable surface $\Sigma_3$, we prove \[ \irank\MCG(\Sigma_3)=4.\] Thus $\MCG(\Sigma_3)$ can be generated by four involutions, but not by three. This settles the genus-three case of Farb's problem on generation by involutions.

明确披露 AI 协作：声明明确限定 AI 辅助仅用于语言润色，不能据此认为 AI 参与生成元构造、下界证明或核心想法。

来源：https://arxiv.org/pdf/2610.22774v1 · PDF 第 4 页，Declaration on the use of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。声明明确限定 AI 辅助仅用于语言润色，不能据此认为 AI 参与生成元构造、下界证明或核心想法。

来源：https://arxiv.org/pdf/2610.22774v1

[arXiv](https://arxiv.org/abs/2610.22774)

## Nearly Sharp Uniform Projection Bounds and Superlinear Vitushkin Inequalities for Deterministic Self-Similar Sets

Caleb Marshall

构造固定于所有尺度的确定性自相似平面集，获得各方向投影的对数衰减界和解析容量的锐对数阶，并推出指数可逼近二的超线性 Vitushkin 比较。

For each $\alpha\in(0,1)$, we construct an explicit deterministic finite homogeneous planar iterated function system of similarities satisfying the strong separation condition, whose attractor $E_\alpha$ has positive finite one-dimensional Hausdorff measure and, for all sufficiently small $\delta>0$, satisfies $\sup_{0\le\theta<\pi}H^1(\pi_\theta(N_\delta(E_\alpha)))\lesssim_\alpha(\log\delta^{-1})^{-\alpha}$. The defining system depends only on $\alpha$ and is fixed at every scale. For these same sets, we prove the sharp analytic capacity law $\gamma(N_\delta(E_\alpha))\asymp_\alpha(\log\delta^{-1})^{-1/2}$ as $\delta\rightarrow0$. Consequently, each $E_\alpha$ satisfies the quantitative Vitushkin comparison $\operatorname{Fav}(N_\delta(E_\alpha))\lesssim_\alpha\gamma(N_\delta(E_\alpha))^{2\alpha}$ for every $\delta\in(0,1)$. These comparisons are superlinear for $\alpha>1/2$, with exponents arbitrarily close to the optimal upper limit two for this class of self-similar sets. A completely specified sixteen-map system gives $\alpha=53/100$ and comparison exponent $53/50$. Inspired by Falconer's Venetian blind constructions, the projection argument combines exact collinear cylinder subfamilies, quantitative distribution of word orientations, and a cover indexed by first successful symbolic blocks. The rotation parameters are explicit powers of a real algebraic number, linking the construction to simultaneous Diophantine approximation. The capacity estimate follows from the curvature characterization of analytic capacity and a telescoping inequality for cylinder masses.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.22908v1

[arXiv](https://arxiv.org/abs/2610.22908)

## Type I estimates for the Kähler-Ricci flow II

Wangjian Jian、Jian Song

从有限时间 Type I 标量曲率估计导出全局一致直径界与收缩纤维的 Type I 直径界，证明流 Gromov–Hausdorff 收敛至由极限上同调类决定的唯一紧度量空间，并研究局部 partial C0 与切收缩子的复解析结构。

In this paper, we establish geometric consequences of our Type I scalar curvature estimate for finite-time solutions of the Kähler-Ricci flow on compact Kähler manifolds. We prove a uniform global diameter bound and a Type I diameter bound for every fibre of finite time holomorphic contraction. These estimates yield Gromov-Hausdorff convergence to a unique compact metric space homeomorphic to the normal Kähler space determined by the limiting cohomology class. We also establish a local partial $C^0$ estimate for the normalized flow and show that the tangent shrinkers are normal complex analytic varieties with log terminal singularities.

明确披露 AI 协作：致谢明确披露 ChatGPT 参与论证讨论及稿件准备与修订，尤其对作者原有的定理 1.1(ii) 证明带来实质性改进。记录证明完善、探索讨论和写作，不把改进原证明推断为 AI 提出原始核心想法。

来源：https://arxiv.org/pdf/2610.22941v1 · PDF 第 6 页，Acknowledgements

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢明确披露 ChatGPT 参与论证讨论及稿件准备与修订，尤其对作者原有的定理 1.1(ii) 证明带来实质性改进。记录证明完善、探索讨论和写作，不把改进原证明推断为 AI 提出原始核心想法。

来源：https://arxiv.org/pdf/2610.22941v1

[arXiv](https://arxiv.org/abs/2610.22941)

## Ricci pinching on complete Kähler manifolds with nonnegative bisectional curvature

Hanzhang Yin

证明复维至少二、非负全纯双截曲率且 Ricci 一致夹逼的连通完备 Kähler 流形必紧或平坦，去除旧平坦性定理的 Euclidean 体积增长假设。

We prove that a connected complete Kähler manifold of complex dimension at least two with nonnegative holomorphic bisectional curvature and uniformly pinched Ricci curvature is compact or flat. This removes the Euclidean volume growth assumption from the flatness theorem of Liu and Ni \cite{LiuNi} for uniform Ricci pinching. We first construct a Lipschitz plurisubharmonic function with finite total Monge--Ampère mass by solving a global Bellman equation. Weighted estimates for a holomorphic canonical section then give a finite top Ricci integral. Ricci pinching implies that the Ricci form belongs to $L^n$, and its Hodge heat evolution has zero top integral by a Stokes argument and scalar heat decay. \par\noindent\textit{Keywords.} Kähler manifolds, Ricci pinching, nonnegative bisectional curvature, Bellman equations, Monge--Ampère mass.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.22969v1

[arXiv](https://arxiv.org/abs/2610.22969)

## Rational Area Profiles of Regular Polygons Cut by Two Congruent Diagonals

Shoichi Inoue、Keiichi Watanabe

分类正 n 边形被两条非直径、相交且等长对角线切分后各区域组合的有理面积比：四区同时有理只出现于六边形，并识别零散配置与无限族。

Two congruent diagonals of a regular hexagon cut it into four regions whose areas are all rational multiples of the area of the hexagon. We determine when this phenomenon occurs in a regular $n$-gon. For every regular polygon cut by two intersecting congruent diagonals, neither of which is a diameter, we classify all unions of the four resulting regions whose areas are rational fractions of the total area. The hexagon is the only configuration in which all four regions are simultaneously rational. One of the two regions on the axis of symmetry is rational in exactly five sporadic configurations, with $n=6,18,30$, whereas the other region and the adjacent two-region unions belong to infinite families with simple geometric explanations. The two lateral regions have rational area ratios in exactly two configurations, with $n=6$ and $n=12$. The proof reduces each area ratio to a trigonometric quotient, bounds its rational values by norms in cyclotomic fields, and settles the remaining equations using Myerson's classification of equal products of two sines and the Poonen--Rubinstein classification of a three-sine-product equation.

明确披露 AI 协作：作者贡献与 AI 使用声明明确披露 ChatGPT、Claude、Gemini 辅助数学论证和证明修改、检查潜在缺口、探索候选配置及证明策略、编写有限验证代码和准备初稿。问题由作者提出，结果与引用均由作者核验。其他 AI 命中是面积变量 A_I，不作为使用证据。

来源：https://arxiv.org/pdf/2610.22970v1 · PDF 第 23 页，Author contributions 与 Use of artificial intelligence

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者贡献与 AI 使用声明明确披露 ChatGPT、Claude、Gemini 辅助数学论证和证明修改、检查潜在缺口、探索候选配置及证明策略、编写有限验证代码和准备初稿。问题由作者提出，结果与引用均由作者核验。其他 AI 命中是面积变量 A_I，不作为使用证据。

来源：https://arxiv.org/pdf/2610.22970v1

[arXiv](https://arxiv.org/abs/2610.22970)

## Classification of real Lie algebras of dimension one, two and three

Mehdi Nadjafikhah

以导出理想、外对偶及 S·a=0 的分解重现一至三维实李代数分类，补充矩阵实现、最小忠实表示维数和识别算法。

We present an exhaustive, self-contained, and coordinate-free structural classification of real Lie algebras of dimensions one, two, and three up to isomorphism. In dimensions one and two, the classification is governed entirely by the derived ideal and elementary derivation theory. In dimension three, we develop the classical exterior duality isomorphism $\Lambda^2\mathfrak{g} \cong \mathfrak{g}^* \otimes \Lambda^3\mathfrak{g}$ pioneered by Bryant and Milnor, which reduces the quadratic Jacobi identity on the $3 \times 3$ structure matrix $C = S + \hat{a}$ to the linear orthogonality relation $S \cdot a = 0$, where $a = \frac{1}{2}\chi$ is the trace covector. We systematically bifurcate the three-dimensional category into unimodular ($a = 0$) and non-unimodular ($a \neq 0$) sectors, completely recovering the nine classical Bianchi isomorphism classes (Bianchi types I through IX) alongside their continuous moduli invariants. Furthermore, we establish the Levi--Malcev decomposition for low dimensions, compute the exact minimal representation dimension $\mu(\mathfrak{g})$ via Ado's Theorem by constructing explicit matrix realizations in $\mathfrak{gl}(\mu, \mathbb{R})$, and formulate a deterministic, coordinate-free decision algorithm for algebra identification.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.23000v1

[arXiv](https://arxiv.org/abs/2610.23000)

## Classification of real Lie algebras of dimension four

Mehdi Nadjafikhah

通过 Levi–Malcev 分解与 nilradical，将四维实李代数分类化为外导子的自同构轨道及二维线性代数子代数问题，并给出与经典表的对应。

We present an exhaustive, coordinate-free, and self-contained classification of four-dimensional real Lie algebras up to isomorphism. In dimension three, classification schemes frequently exploit Bryant's classical exterior duality isomorphism $\Lambda^2\mathfrak{g} \cong \mathfrak{g}^* \otimes \Lambda^3\mathfrak{g}$, which reduces the Jacobi identity to an elegant linear algebraic condition on a single $3\times 3$ matrix. We explicitly demonstrate that this accidental isomorphism breaks down in dimension four due to the dimensional mismatch $\dim \Lambda^2\mathfrak{g} = 6 \neq 4 = \dim(\mathfrak{g}^* \otimes \Lambda^4\mathfrak{g})$, transforming the Jacobi identity into a non-linear system of 16 quadratic constraints on 24 structure constants. To overcome this geometric obstruction without relying on brute-force polynomial elimination, we employ an intrinsic Lie-theoretic reduction: the Levi--Malcev decomposition isolates the non-solvable sector into direct products with three-dimensional simple ideals, while the solvable sector is classified by anchoring the structure to its nilradical $\mathfrak{n}$, which is an intrinsic characteristic ideal. For codimension-one nilradicals ($\dim\mathfrak{n} = 3$), the problem is reduced to classifying outer derivations of $\mathbb{R}^3$ and the Heisenberg algebra $\mathfrak{h}_3$ under the action of the automorphism group modulo global rescaling and central translations. For two-dimensional nilradicals, the structure is resolved via maximal abelian sub-algebras of $\mathfrak{gl}(2,\mathbb{R})$ lacking nilpotent elements. Complete proofs are supplied for all reductions, precise moduli parameter ranges are established to eliminate redundancies, and an explicit isomorphism dictionary is provided bridging our structural models with classical tabulations in mathematical physics.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.23008v1

[arXiv](https://arxiv.org/abs/2610.23008)

## Spectral Schwarz Lemmas and Parallel Obstructions to Metric Comparison

Xu Pang、Yao Sha、Ren Xin-An

在紧 Hermitian 底空间上，刻画参考度量收缩 Chern 曲率半正时，同常数曲率比较何时推出度量比较：恰好其核内没有非零平行子丛；并建立完备 Kähler 底上与秩无关的全纯丛映射估计。

In this paper, we characterize when comparison of contracted Chern curvatures implies comparison of Hermitian bundle metrics with the same constant on compact Hermitian bases. If the curvature contraction of the reference metric is semipositive, this implication holds for every Hermitian metric if and only if the kernel of this contraction contains no nonzero subbundle parallel with respect to the Chern connection of the reference metric. The equality terms of a $C^2$ spectral truncation identify the parallel summand on which comparison can fail, without regularity assumptions on the curvature kernel. We also establish a sharp operator estimate, with a constant independent of the bundle ranks, for holomorphic bundle maps on complete Kähler bases under curvature bounds and bounded base-map energy density. Smooth Schatten moments give global control without a separate boundedness assumption on the bundle map. Finally, we obtain rank bounds and conditions for vanishing on compact Hermitian bases from directional curvature traces over fiber subspaces. For higher-dimensional subspaces, these conditions allow mixed signs on individual fiber lines.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.23011v1

[arXiv](https://arxiv.org/abs/2610.23011)

## Sharp improved Sobolev inequalities on $\mathbb{S}^n$

Juncheng Wei、Zetian Yan、Zikai Ye

对 n≥4 的球面函数，在临界密度重心为零且不要求对称性的条件下，证明 Aubin 型改进 Sobolev 不等式，Dirichlet 系数以最优因子 2^(−2/n) 改善、L2 系数保持一，等号仅为常数。

We prove sharp improved Sobolev inequalities on $\mathbb{S}^n$, $n\ge 4$, for functions whose critical density $|u|^{2n/(n-2)}$ has zero barycenter, without any symmetry assumption. The Dirichlet coefficient improves by the optimal factor $2^{-2/n}$, while the coefficient of the $L^2$ term remains one. Equality holds precisely for constant functions. This establishes the sharp form of Aubin's improved Sobolev inequality in every dimension $n\ge4$.

明确披露 AI 协作：声明明确披露主要使用 ChatGPT/Codex 进行头脑风暴、文献检索、稿件编辑及计算辅助部分；作者独立完成并核验定理、证明、计算和常数。记录探索、文献、写作及计算，不推断 AI 提出核心想法。

来源：https://arxiv.org/pdf/2610.23069v1 · PDF 第 4 页，Disclosure on AI assistance

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。声明明确披露主要使用 ChatGPT/Codex 进行头脑风暴、文献检索、稿件编辑及计算辅助部分；作者独立完成并核验定理、证明、计算和常数。记录探索、文献、写作及计算，不推断 AI 提出核心想法。

来源：https://arxiv.org/pdf/2610.23069v1

[arXiv](https://arxiv.org/abs/2610.23069)

## Regular Additive Scalar Invariants of ${\mathcal N}=1$ Hyperbolic Spin Supertriangles

Ilia Gaiur、Robert Penner

分类固定 spin lift 的非退化双曲 N=1 spin supertriangle 在测地细分下可加的循环标量不变量，得到超维数 3|1，并描述反转 spin lift 时奇生成元的变号。

We classify regular cyclic scalar invariants of non-degenerate hyperbolic ${\mathcal N}=1$ spin supertriangles which are additive under geodesic subdivision. After fixing the spin lift, the common-first gauge (introduced in earlier work by the second-named author and further developed here) gives a complete $3|4$ modulus of such supertriangles.. The space of additive scalar invariants is proved to have superdimension $3|1$: ordinary hyperbolic area in degree zero, two even generators in degree two, and one odd generator in degree three; the degree-one and degree-four sectors vanish. One degree-two generator is the fermionic first variation of body area, equivalently the nilpotent correction from ordinary body angle defect to super angle defect. The degree-three generator changes sign under reversal of the spin lift, while the other generators are fixed, so ordinary supertriangles carry only three even invariants.

明确披露 AI 协作：声明说明 ChatGPT 作为证明辅助支持计算例程和数学步骤讨论，另用于文献综述、黑板公式和图像转 LaTeX 及代码核查；关键想法与方法由作者提出并在作者讨论中成形。

来源：https://arxiv.org/pdf/2610.23209v1 · PDF 第 3 页，Acknowledgements and usage of AI

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。声明说明 ChatGPT 作为证明辅助支持计算例程和数学步骤讨论，另用于文献综述、黑板公式和图像转 LaTeX 及代码核查；关键想法与方法由作者提出并在作者讨论中成形。

来源：https://arxiv.org/pdf/2610.23209v1

[arXiv](https://arxiv.org/abs/2610.23209)

## Long-time existence of the Laplacian flow with Weyl tensor

Chuanhuan Li、Yi Li、Kai Zheng

对紧七维闭 G2 结构的 Laplacian 流，在标量曲率一致下界下，以 Weyl 的 77 维分量 W77 的空间 Lp 界或混合时空可积性保证光滑延拓，包含有限时空 L4 范数的充分条件。

We establish integral extension criteria for the Laplacian flow of closed $G_2$-structures on compact $7$-dimensional manifolds $M$. Assuming a uniform lower bound for the scalar curvature, we prove that a finite-time solution extends smoothly whenever the spatial $L^p$ norm of the $77$-dimensional Weyl component $W_{77}$ remains uniformly bounded for some $p\ge 7/2$. We also obtain a mixed space--time extension criterion under the condition \[ W_{77}\in L^q(0,T;L^p(M,g(t))), \qquad \frac{7}{2}<p<\infty,\quad 1\le q<\infty,\quad \frac{1}{q}+\frac{7}{p}\le 2. \] In particular, finite space-time $L^4$ integrability of $W_{77}$ is sufficient for extension.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.23412v1

[arXiv](https://arxiv.org/abs/2610.23412)

## Entropy estimates and volume rigidity for graphs with positive Bakry-Émery curvature

Yanlong Ding、Shiping Liu、Chiyu Zhou

借热流熵估计为正 Bakry–Émery 曲率的加权图建立体积界和等号刻画；非归一化 Laplacian 的 CD(2,∞) 情形得到顶点数≤2^d，等号恰为超立方体。

We establish a volume bound for weighted graphs with positive Bakry--Émery curvature through entropy estimates for the heat flow and characterize the equality case. As a consequence, if a connected unweighted graph $G=(V,E)$ satisfies the Bakry--Émery curvature--dimension condition $CD(2,\infty)$ with respect to the unnormalized Laplacian, then $$ |V|\le 2^d, $$ where $d$ denotes the maximum degree. Equality holds if and only if $G$ is a hypercube. We also establish an analogous volume rigidity result for the normalized Laplacian.

明确披露 AI 协作：声明明确披露生成式 AI 辅助探索并完善本文的熵方法；数学论证和计算均由作者独立核验。原文未明确将最初核心想法归因于 AI，故记录探索与方法完善而不计入核心想法。

来源：https://arxiv.org/pdf/2610.23417v1 · PDF 第 3 页，Use of artificial intelligence

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。声明明确披露生成式 AI 辅助探索并完善本文的熵方法；数学论证和计算均由作者独立核验。原文未明确将最初核心想法归因于 AI，故记录探索与方法完善而不计入核心想法。

来源：https://arxiv.org/pdf/2610.23417v1

[arXiv](https://arxiv.org/abs/2610.23417)

## Complete harmonic metrics and subharmonic functions on the complex plane

Natsuo Miyatake

将 cyclic Higgs bundle 的扩展 Hitchin 方程推广到一般次调和权重，证明行列式一的完备解唯一性；在复平面上只要权重不恒为负无穷就存在，并由光滑递减权重的解单调逼近。

This paper continues our previous work \cite{Miy6} on an extension of the Li--Mochizuki theorem concerning the existence and uniqueness of complete diagonal harmonic metrics on cyclic Higgs bundles over open Riemann surfaces. We consider the extended Hitchin equation associated with general subharmonic weight functions on the canonical bundle, not necessarily induced by holomorphic $r$-differentials. We establish uniqueness of complete solutions with determinant $1$ for arbitrary subharmonic weight functions, without additional regularity assumptions on them. We also prove that, on the complex plane, such a complete solution exists whenever the weight function is not identically $-\infty$. Furthermore, if $(\varphi_\epsilon)_{\epsilon>0}$ is a family of smooth subharmonic weight functions decreasing to such a weight function $\varphi$ as $\epsilon\searrow0$, the associated family of smooth complete solutions $(h_\epsilon)_{\epsilon>0}$ with $\det(h_\epsilon)=1$ converges monotonically to the unique complete solution $h$ associated with $\varphi$ and satisfying $\det(h)=1$.

明确披露 AI 协作：致谢明确披露 ChatGPT 用于数学讨论、英文编辑及文献检索；其中 GPT-6.1 Sol 建议了命题 25 的当前表述，帮助突破作者旧表述无法处理一般唯一性的困难，讨论也帮助识别多处论证缺口。该段具体归因关键研究路线，并由作者核验最终数学内容。

来源：https://arxiv.org/pdf/2610.23441v1 · PDF 第 3 页，Acknowledgements

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢明确披露 ChatGPT 用于数学讨论、英文编辑及文献检索；其中 GPT-6.1 Sol 建议了命题 25 的当前表述，帮助突破作者旧表述无法处理一般唯一性的困难，讨论也帮助识别多处论证缺口。该段具体归因关键研究路线，并由作者核验最终数学内容。

来源：https://arxiv.org/pdf/2610.23441v1

[arXiv](https://arxiv.org/abs/2610.23441)

## On flat metric nilpotent Lie algebras

Huihui An、Zaili Yan、Hui Zhang、Shaoxiang Zhang

结合典范仿射作用与 Scheuneman 纯平移定理，证明非阿贝尔平坦度量幂零李代数的 Levi-Civita 表示必有非零核，从而每个 n 维对象为 n−2 维对象的双扩张。

We study flat left-invariant pseudo-Riemannian metrics on nilpotent Lie groups. Associated with a flat metric Lie algebra $(\mathfrak{g},\langle\cdot,\cdot\rangle)$ there is a canonical affine action of the corresponding group on the vector space $\mathfrak{g}$, whose linear part is the Levi-Civita representation $L$. Combining this action with Scheuneman's theorem on pure translations in nilpotent affine groups, we prove that a flat metric nonabelian nilpotent Lie algebra has a nontrivial kernel of $L$, that is, $\ker L\neq 0$. As a consequence, every $n$-dimensional flat metric nonabelian nilpotent Lie algebra is a double extension of an $(n-2)$-dimensional flat metric nilpotent Lie algebra.

明确披露 AI 协作：跨页 AI Disclosure 明确限定 ChatGPT 与 WorkBuddy 作为语言编辑、表述和组织改善的辅助工具；数学陈述、证明、计算与结论由作者独立核验。

来源：https://arxiv.org/pdf/2610.23481v1 · PDF 第 6–7 页，AI Disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。跨页 AI Disclosure 明确限定 ChatGPT 与 WorkBuddy 作为语言编辑、表述和组织改善的辅助工具；数学陈述、证明、计算与结论由作者独立核验。

来源：https://arxiv.org/pdf/2610.23481v1

[arXiv](https://arxiv.org/abs/2610.23481)

## Stability of Hyperplane Projections of the Regular Simplex and $L_p$-Projection Bodies of balls in $\ell_q^n(\mathbb{R})$

Jacek Jakimiuk、Christos Pandis

证明正单纯形极值超平面投影的稳定估计，并将 lq 球相关稳定性和归一化比值单调性推广到 Lp 投影体，通过支撑函数公式及 Gaussian mixture 的 majorization 稳定改进实现。

We prove stability estimates for extremal hyperplane projections of the regular simplex. We further generalize the analogous stability estimates for $\ell_q$-balls by the first named author and the monotonicity theorem for normalized ratios by Barthe and Naor to the $L_p$-setting. To this end, we derive closed formulas for the support functions of their $L_p$-projection bodies, complementing those obtained by the second named author. A key ingredient in our proofs is a stability refinement of the majorization inequality for Gaussian mixtures.

明确披露 AI 协作：AI tools disclosure 明确说明数学想法及技术实现由作者完成，ChatGPT 5.6 Sol 与 ChatGPT 6 用于改善表述语言、文献检索以及核对部分计算；作者审核最终内容。

来源：https://arxiv.org/pdf/2610.23489v1 · PDF 第 23 页，AI tools disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI tools disclosure 明确说明数学想法及技术实现由作者完成，ChatGPT 5.6 Sol 与 ChatGPT 6 用于改善表述语言、文献检索以及核对部分计算；作者审核最终内容。

来源：https://arxiv.org/pdf/2610.23489v1

[arXiv](https://arxiv.org/abs/2610.23489)

## mixed Hodge structures on the strictly upper triangular Lie algebras

Taito Shimoji

证明上单位三角群 Uk(R) 的格在 k≥3 时成为光滑拟射影复代数簇基本群的充要条件为 k=3，借 Malcev 李代数的混合 Hodge 权重与共轭对称性排除更高 k。

We show that, for $k\geq 3$, a lattice in the unitriangular Lie group $U_k(\mathbb{R})$ is the fundamental group of a smooth quasi-projective complex algebraic variety if and only if $k=3$. The proof uses the conjugation symmetry and weight conditions of mixed Hodge structure on the Malcev Lie algebra proven by Morgan. This result identifies a family of groups that must be excluded in the search for smooth quasi-projective varieties with torsion-free nilpotent fundamental groups of high nilpotency class.

明确披露 AI 协作：第 1.4 节明确披露 ChatGPT 用于语言编辑及其他编辑辅助；对引理证明的改进在随后致谢中归于导师，不能混记为 AI 贡献。

来源：https://arxiv.org/pdf/2610.23505v1 · PDF 第 4 页，第 1.4 节 AI Declaration

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。第 1.4 节明确披露 ChatGPT 用于语言编辑及其他编辑辅助；对引理证明的改进在随后致谢中归于导师，不能混记为 AI 贡献。

来源：https://arxiv.org/pdf/2610.23505v1

[arXiv](https://arxiv.org/abs/2610.23505)

## Closed geodesics on compact semi-Riemannian manifolds

Souheib Allout、Salah Chaib

构造六维紧且测地完备、签名 (2,4) 的伪黎曼流形，没有非恒定闭测地线。模型为 Sol×Euc 上两个完备 Lorentz 左不变度量的直积及适当不可约余紧格商；这并未回答完备紧 Lorentz 流形是否必有闭测地线。

We study the existence of closed geodesics on compact quotients of Lie groups endowed with left-invariant pseudo-Riemannian metrics. We construct a compact, geodesically complete pseudo-Riemannian manifold that admits no closed geodesics. We also establish the existence of closed geodesics in several settings, with particular focus on the Lorentzian case.

明确披露 AI 协作：AI declaration 明确限定工具仅用于写作辅助，数学内容由作者发展并核验；不据此认定 AI 参与反例构造或证明。

来源：https://arxiv.org/pdf/2610.23552v1 · PDF 第 7 页，AI declaration

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI declaration 明确限定工具仅用于写作辅助，数学内容由作者发展并核验；不据此认定 AI 参与反例构造或证明。

来源：https://arxiv.org/pdf/2610.23552v1

[arXiv](https://arxiv.org/abs/2610.23552)

## Phases in the cyclic quantum dilogarithm: correction to "Cyclic quantum Teichmüller theory"

Tsukasa Ishibashi

修正循环量子双对数中的 μN 相位：全局系数需加入提升数据形成覆盖，五边形关系通常多出相位；在正则 locus 的 strict 提升上额外因子为一，恢复原定理。

We first correct $\boldsymbol{\mu}_N$-phase issues in the basic definition around the cyclic quantum dilogarithm operators in [Ish26]. In particular, the notion of global coefficients must be extended by incorporating additional lifting data forming a $\boldsymbol{\mu}_N$-cover, and the pentagon relation generally acquires an extra $\boldsymbol{\mu}_N$-factor. Nevertheless, we prove that every point in a regular locus of the partially compactified cluster Poisson variety lifts to a \emph{strict} extended global coefficient, for which this extra $\boldsymbol{\mu}_N$-factor is trivial. Consequently, the original statements of [Ish26] hold for such lifts and are therefore restored.

明确披露 AI 协作：AI disclosure 说明 ChatGPT-6 Astra 辅助识别已发表论文问题、建议修正策略、检索文献及语法修改；作者从多个策略中选择第 1.2 节方案，并独立重建最终数学论证。记录纠错、策略探索、文献及写作，未明确原始核心想法归属。

来源：https://arxiv.org/pdf/2610.23572v1 · PDF 第 5 页，AI disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI disclosure 说明 ChatGPT-6 Astra 辅助识别已发表论文问题、建议修正策略、检索文献及语法修改；作者从多个策略中选择第 1.2 节方案，并独立重建最终数学论证。记录纠错、策略探索、文献及写作，未明确原始核心想法归属。

来源：https://arxiv.org/pdf/2610.23572v1

[arXiv](https://arxiv.org/abs/2610.23572)

## Arithmeticity, superrigidity, and totally geodesic submanifolds of infinite-volume hyperbolic manifolds

Nicholas Miller

对具 Fuchsian ends 的无限体积凸余紧双曲流形，在有无穷多个与凸核相交的最大适当浸入全测地子流形且维数至少二时，证明它无限覆盖某个算术双曲流形，并分类相应 SO0(m,1) 不变 Radon 测度。

Given an infinite-volume convex cocompact hyperbolic manifold with Fuchsian ends and infinitely many maximal properly immersed totally geodesic submanifolds of dimension at least two intersecting its convex core, we show that it (infinitely) covers an arithmetic hyperbolic manifold. This answers the general version of a question of Oh. As a byproduct of our techniques, we also give a Ratner-type classification of $\mathrm{SO}_0(m,1)$-invariant Radon measures whose support intersects the frame bundle of the interior of the convex core.

明确披露 AI 协作：作者明确披露第 5 节若干想法在与大语言模型的对话中发展；引言说明该节通过边界测度及熵关系获取后续 Ratner 论证所需的额外不变性。另披露文献检索、校对、制图及证明检查。记录所指研究路线和辅助用途，不补写未说明的模型名称。

来源：https://arxiv.org/pdf/2610.23594v1 · PDF 第 6 页，AI Disclosure；第 4 页对第 5 节作用的说明

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。作者明确披露第 5 节若干想法在与大语言模型的对话中发展；引言说明该节通过边界测度及熵关系获取后续 Ratner 论证所需的额外不变性。另披露文献检索、校对、制图及证明检查。记录所指研究路线和辅助用途，不补写未说明的模型名称。

来源：https://arxiv.org/pdf/2610.23594v1

[arXiv](https://arxiv.org/abs/2610.23594)

## Height of minimal surfaces: sharp thresholds

Tobias Holck Colding、William P. Minicozzi II

对 C2 中 proper 全纯曲线，以投影平面的 Kähler 角确定线性高度锥的两个锐阈值，分隔不存在、代数性与超二次增长；对 stationary integral varifold 给出次线性、窄锥与宽锥的增长三分，并证明窄锥指数中 ε² 阶不可改善。

The confinement theorem of [CM1] gives Euclidean volume growth for a proper minimal submanifold whose height over a plane is sublinear. Such volume growth places strong restrictions on the geometry. This leaves linear height as the natural borderline and raises the question of which, if any, linearly growing cones still force Euclidean growth. Here we determine this borderline sharply for proper holomorphic curves in $C^2$. There are two sharp thresholds for the aperture depending on the Kähler angle $\theta$ of the two-plane $\Pi$: $\tan(\theta/2)$ and $\cot(\theta/2)$. No proper holomorphic curve exists below the first, every such curve is algebraic below the second, and superquadratic proper holomorphic disks exist above the second. These conclusions extend to holomorphic submanifolds of arbitrary dimension and codimension. For stationary integral varifolds there are again three regimes: sublinear height forces Euclidean growth, narrow cones of aperture $\varepsilon$ force polynomial growth with exponent $n+O(\varepsilon^2)$, and wide cones allow arbitrarily fast growth. The order $\varepsilon^2$ is sharp: already in $R^3$, for every small $\varepsilon>0$ there are examples in a cone of aperture $\varepsilon$ whose volume grows at least like $r^{2+\frac45\varepsilon^2}$.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.23629v1

[arXiv](https://arxiv.org/abs/2610.23629)

## Two-generator presentations with a relation gap

Laurent Bartholdi、Martin R. Bridson、Roman Mikhailov、John Nicholson

对互素 p,q≥2，构造双生成元双关系群 G=<x,t | x^(pq), [x^p,t x^q t^(-1)]>，证明关系模为循环模而群并非单关系群，解决 relation gap 问题。另以附加三胞腔构造 D2 复形，但其 Wall D2 反例推论明确依赖外部预印本的 Corollary 2.3，不能与独立证明的定理 A 混为无条件结果。

We exhibit two-generator two-relator group presentations that have cyclic relation modules but do not present one-relator groups; this resolves the relation gap problem. By attaching a single 3-cell to each of the corresponding presentation 2-complexes, one obtains counterexamples to Wall's D2 problem.

明确披露 AI 协作：Declaration of AI usage 明确披露 ChatGPT 6 Astra 辅助发现定理 A 的群、证明该结果及准备初稿，Claude Fable 5.1 参与后续编辑。作者充分检查并实质性修订论证和文本；外部 OpenAI 定理引用与这项工具使用声明分别记录。

来源：https://arxiv.org/pdf/2610.23637v1 · PDF 第 3 页，Declaration of AI usage

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。Declaration of AI usage 明确披露 ChatGPT 6 Astra 辅助发现定理 A 的群、证明该结果及准备初稿，Claude Fable 5.1 参与后续编辑。作者充分检查并实质性修订论证和文本；外部 OpenAI 定理引用与这项工具使用声明分别记录。

来源：https://arxiv.org/pdf/2610.23637v1

[arXiv](https://arxiv.org/abs/2610.23637)

## A Topological Quantum Field Theory for Representation Varieties of Torus Links

Enrique Aycart-Maldonado、Alejandro Calleja

构造计算 torus link 补空间群的 G-表示簇虚类的 TQFT，用适当 bordism 的迭代递归求值，并显式计算 AGL1(C) 与 SL2(C) 情形。

We construct a Topological Quantum Field Theory (TQFT) that computes the virtual classes of $G$-representation varieties associated with the fundamental group of a torus link complement. Following the framework established by González-Prieto, Logares and Muñoz for $G$-representation varieties of surface groups, we introduce a suitable bordism whose iteration enables a recursive topological evaluation of these virtual classes. Via this TQFT, we explicitly compute the virtual class of these varieties for the groups $G=\mathrm{AGL}_1(\mathbb{C})$ and $G=\mathrm{SL}_2(\mathbb{C})$.

明确披露 AI 协作：AI Tool Use 明确披露 ChatGPT 6 Astra 和 Claude Opus 5.5 用于编辑校对、LaTeX 排版、TikZ 图、语法及参考文献格式；研究设计、数学结果与证明由作者完成。记录写作排版及制图，不把格式处理误记为文献发现或证明贡献。

来源：https://arxiv.org/pdf/2610.23644v1 · PDF 第 31 页，AI Tool Use

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI Tool Use 明确披露 ChatGPT 6 Astra 和 Claude Opus 5.5 用于编辑校对、LaTeX 排版、TikZ 图、语法及参考文献格式；研究设计、数学结果与证明由作者完成。记录写作排版及制图，不把格式处理误记为文献发现或证明贡献。

来源：https://arxiv.org/pdf/2610.23644v1

[arXiv](https://arxiv.org/abs/2610.23644)

## Three-circle inequalities for almost harmonic functions on cylinders

Yuxiang Li、Wenjuan Qi

对长柱面上的一类近调和函数建立加权能量三圆不等式，得到指数衰减与临界 Fourier 模主导的二分及归一化极限轮廓；额外结构下识别平均颈曲线方程，并应用于多类调和映射逼近与 Willmore 曲面。

The three-circle method was introduced into the blow-up analysis of harmonic maps by Qing and Tian [Comm. Pure Appl. Math. 1997]. We extend this method to a class of $(\tau,\epsilon)$-almost harmonic functions on long cylinders and establish three-circle inequalities for their weighted energies. These inequalities yield a dichotomy between exponential energy decay and asymptotic dominance of a critical Fourier mode, together with a characterization of the corresponding normalized limiting profiles. In the unweighted case, we prove convergence of the averaged neck curves and identify their limiting equations under additional structural assumptions. Applications include neck analysis and energy identities for harmonic maps, solutions of Rivière's equation, $\alpha$-harmonic maps, biharmonic approximations of harmonic maps, and Willmore surfaces.

明确披露 AI 协作：跨页致谢明确说明 AI 不用于数学想法、结果或证明，仅用于语言编辑和检查排字错误；数学部分在当前稿准备前已完成。记录语言辅助，不把否定数学贡献误读为完全未使用 AI。

来源：https://arxiv.org/pdf/2610.23648v1 · PDF 第 7–8 页，Acknowledgements

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。跨页致谢明确说明 AI 不用于数学想法、结果或证明，仅用于语言编辑和检查排字错误；数学部分在当前稿准备前已完成。记录语言辅助，不把否定数学贡献误读为完全未使用 AI。

来源：https://arxiv.org/pdf/2610.23648v1

[arXiv](https://arxiv.org/abs/2610.23648)

## Finite Cyclic Fundamental Groups and Exotic Universal Covers from the Cartwright--Steger Surface

Anar Akhmedov、B. Doug Park、Sümeyra Sakallı、Sai-Kee Yeung

利用 Cartwright–Steger 曲面的结点曲线构造指定固定拓扑不变量、任意非平凡有限循环基本群的极小辛四流形，并以其为构件得到各 m≥2 对应正负 CP2 连通和的辛实现。

We use a particular nodal curve on the Cartwright-Steger surface to construct minimal symplectic four-manifolds with arbitrary nontrivial finite cyclic fundamental group and fixed topological invariants $(e,\sigma,\chi_h,c_1^2)=(43,1,11,89)$. Using these symplectic four-manifolds as building blocks, we construct a symplectic 4-manifold that is homeomorphic to $(22m-1)\mathbb{CP}^2\#(21m-1)\overline{\mathbb{CP}}^{\,2}$ for any integer $m\geq 2$.

明确披露 AI 协作：致谢区分了 Magma 辅助基本群计算与大语言模型仅做语法检查。普通 Magma 使用不是 AI 披露证据；本篇 AI 用途仅记录语言检查。

来源：https://arxiv.org/pdf/2610.23711v1 · PDF 第 15 页，Acknowledgments

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。致谢区分了 Magma 辅助基本群计算与大语言模型仅做语法检查。普通 Magma 使用不是 AI 披露证据；本篇 AI 用途仅记录语言检查。

来源：https://arxiv.org/pdf/2610.23711v1

[arXiv](https://arxiv.org/abs/2610.23711)

## Two-bridge knot epimorphisms and intersections in the character variety

Isidora Bailly-Hall、Michelle Chu、Karina Dovgodko、Akash Ganguly、Jiachen Kang、Jishi Sun

对满射到 trefoil 群的双曲二桥结群，研究满射产生的非典范不可约表示分支，证明它与其他分支的所有仿射交点均代数非整，从而检测本质曲面，并由连分数显式给出边界斜率。

We study the SL(2,C) character varieties of hyperbolic two-bridge knot groups admitting epimorphisms onto the trefoil knot group. Ohtsuki, Riley, and Sakuma give a systematic construction of an infinite family of such knots. The character varieties of these knot groups contain a component of irreducible representations arising from the epimorphism, which is distinct from the canonical component. We prove that every affine point of intersection between this component and any other component is algebraic non-integral, and therefore detects an essential surface in the knot complement. We also determine the boundary slope of each detected surface explicitly in terms of the continued fraction expansion of the two-bridge knot.

明确披露 AI 协作：AI Disclosure 明确说明数学内容不依赖 AI，但最终准备时使用 Claude 校对、修改语法和检查记号一致性。按此记录写作校对，不推断数学证明或核心想法贡献。

来源：https://arxiv.org/pdf/2610.23731v1 · PDF 第 21 页，AI Disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI Disclosure 明确说明数学内容不依赖 AI，但最终准备时使用 Claude 校对、修改语法和检查记号一致性。按此记录写作校对，不推断数学证明或核心想法贡献。

来源：https://arxiv.org/pdf/2610.23731v1

[arXiv](https://arxiv.org/abs/2610.23731)

## Spectral networks, finite webs, and the $T_3$ cubic differential

Omar Kidwai、Guillaume Tahar

为三次微分情形定义有限 webs 并证明中心荷非零；对 P1 上恰有三个二阶极点的 T3 模型，证明有理角处网络全退化且壁数由算术判据决定，其他角度稠密且无有限 webs。

We describe spectral networks for cubic differentials on $\mathbf{P}^1$ with exactly three poles all of order two, following observations of Hollands-Neitzke. To do so, we give a precise definition and establish some basic properties of a class of finite webs (corresponding to BPS states in physics) in the cubic differential setting, including their non-vanishing central charge. Turning to the example, we prove that at rational angles the network is totally degenerate; the number of walls and Stokes regions is explicitly computed and depends on an arithmetic criterion. At all other angles, the spectral network is dense in the surface and contains no finite webs, as expected. Physically, this example corresponds to a fundamental building block for a large class of four-dimensional $\mathcal{N}=2$ QFTs with gauge group $\mathrm{SU}(3)$.

明确披露 AI 协作：AI disclosure 披露 AI 辅助绘制部分图，并指出错误与不一致，随后由作者手工修正；未说明模型或核心定理思路归属。

来源：https://arxiv.org/pdf/2610.23752v1 · PDF 第 4 页，AI disclosure

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI disclosure 披露 AI 辅助绘制部分图，并指出错误与不一致，随后由作者手工修正；未说明模型或核心定理思路归属。

来源：https://arxiv.org/pdf/2610.23752v1

[arXiv](https://arxiv.org/abs/2610.23752)

## Constructions and reductions on the Hornich-Hlawka inequality and its generalizations

Seokbin Lee

对 Hornich–Hlawka 不等式的五个问题，构造回答三个，包括没有三维该类子空间的等价 l2 范数及失败的 Nakano 空间；其余两个分别归约到临界三维 lp 情形及 Sobolev–Nakano 与 Lp(·) 的等价性。

We investigate five open problems concerning the Hornich-Hlawka inequality and its generalizations posed by Marinescu and Niculescu. We give constructive answers to three of them. First, we construct an equivalent norm on $\ell^2$ with no three-dimensional Hornich-Hlawka subspace. Second, we present a Nakano space that is not Hornich-Hlawka. Third, we show that the $\alpha$-power generalization of the Hornich-Hlawka inequality fails to hold on nonzero normed spaces when $\alpha \in (1, 2) \cup (2, \infty)$. This implies that on every nonzero inner product space, the $\alpha$-power generalization of the Hornich-Hlawka inequality holds for all triples precisely when $\alpha \in (0,1] \cup \{2\}$. For the remaining two problems, we establish reductions. We prove that $\ell^p(N)$ is Hornich-Hlawka for all $N \geq 3$ and $2 < p \leq \log 3 /(\log 3 - \log 2)$ if and only if it is Hornich-Hlawka at $N = 3$ and $p = \log 3 /(\log 3 - \log 2)$. Finally, for $p(\cdot): (0, 1) \to [1, 2]$ measurable and integers $k \geq 0$, we establish a Sobolev-Nakano equivalence: we prove that $W^{k,p(\cdot)}(0,1)$, equipped with the sum of the Luxemburg norms of its derivatives of orders $0, \ldots, k$, is Hornich-Hlawka if and only if $L^{p(\cdot)}(0,1)$ is Hornich-Hlawka.

明确披露 AI 协作：AI Disclosure 明确披露多个模型辅助文献检索、证明想法与审读；ChatGPT-5.6 Sol 生成定理 4.3 初始证明和定理 1.2 的例子，ChatGPT-6 Astra 发现定理 1.4 与引理 6.7 的部分证明。作者重写和简化论证、撰写整稿并独立核验计算。其他 AI-assisted Lean 项目属于外部引用，不混入本篇工具用途。

来源：https://arxiv.org/pdf/2610.23785v1 · PDF 第 30 页，AI Disclosure；第 7 页对初始证明的说明

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI Disclosure 明确披露多个模型辅助文献检索、证明想法与审读；ChatGPT-5.6 Sol 生成定理 4.3 初始证明和定理 1.2 的例子，ChatGPT-6 Astra 发现定理 1.4 与引理 6.7 的部分证明。作者重写和简化论证、撰写整稿并独立核验计算。其他 AI-assisted Lean 项目属于外部引用，不混入本篇工具用途。

来源：https://arxiv.org/pdf/2610.23785v1

[arXiv](https://arxiv.org/abs/2610.23785)

## Revisiting separators in string graphs, region intersection graphs, and induced-minor-free graphs

James Davies、Paweł Rzążewski、Jack Spalding-Jamieson、Bartosz Walczak

以不依赖旧 padded decomposition 的方法证明弦图有 O(√m) 的平衡顶点分隔，并扩展至所述 region intersection 与 induced-minor-free 类，且可在多项式时间找到；另建立适于弦图的最优 padded decomposition 并提供 Lean 4 形式化。

String graphs are intersection graphs of continuous curves in the plane. In 2010, Fox and Pach proved that string graphs with $m$ edges admit balanced vertex separators of size $\mathcal{O}(m^{3/4}\sqrt{\log m})$ and conjectured that this bound can be improved to $\mathcal{O}(\sqrt{m})$, which would be optimal. After partial progress, Lee claimed in 2017 to prove this conjecture, and more generally to prove analogous separator theorems for region intersection graphs over minor-closed graph families. A key intermediate step in Lee's approach was a padded decomposition scheme for region intersection graphs. In 2024, Korhonen and Lokshtanov extended Lee's approach to the broader setting of graph classes excluding a fixed graph as an induced minor. These results have since found applications in a wide range of works. Later in 2024, a flaw was discovered in the construction of Lee's padded decomposition scheme, invalidating Lee's as well as Korhonen and Lokshtanov's separator results, and many works relying on them. In this work, we prove that string graphs with $m$ edges admit balanced separators of size $\mathcal{O}(\sqrt{m})$, and more generally obtain analogous $\mathcal{O}(\sqrt{m})$ bounds for region intersection graphs over fixed minor-closed graph families and for graphs excluding a fixed graph as an induced minor, thereby repairing the vast majority of the affected works. Furthermore, our balanced separators can be found in polynomial time. Our proof uses a different approach from Lee's and does not rely on padded decompositions. Since padded decompositions have also found applications independent of the separator theorems, particularly for string graphs, we also prove a padded decomposition result for region intersection graphs that is optimal for string graphs. We have formalized both the balanced separator and the padded decomposition results in Lean 4 with mathlib.

明确披露 AI 协作：正文主要结果由人类作者无 AI 辅助得到，但声明明确披露 Aristotle 与 GPT 5.6 Sol 生成 Lean 形式化，GPT 5.6 Sol 提出附录 B 改进的初始形式，Claude Opus 5.5 校对全文。作者人工核对定义和主定理，形式化证明细节及常数与正文略有差别，渐近依赖一致。记录证明和形式化、编程与写作，不把附录贡献扩张为正文主结果的原始核心想法。

来源：https://arxiv.org/pdf/2610.23792v1 · PDF 第 5 页 Formalization、第 17 页 Acknowledgements、第 22 页附录 B

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。正文主要结果由人类作者无 AI 辅助得到，但声明明确披露 Aristotle 与 GPT 5.6 Sol 生成 Lean 形式化，GPT 5.6 Sol 提出附录 B 改进的初始形式，Claude Opus 5.5 校对全文。作者人工核对定义和主定理，形式化证明细节及常数与正文略有差别，渐近依赖一致。记录证明和形式化、编程与写作，不把附录贡献扩张为正文主结果的原始核心想法。

来源：https://arxiv.org/pdf/2610.23792v1

[arXiv](https://arxiv.org/abs/2610.23792)

## Symplectic Lie groups and nilmanifolds associated with acyclic quivers

Yihao Zheng

为有限无圈箭图的正路径与全路径李群给出左不变辛形式的组合判据；正路径情形强迫幂零阶至多三，并刻画 Lagrangian 正规子群、紧商上的环面纤维化和上同调 Lefschetz 秩。

We give combinatorial criteria for the existence of left-invariant symplectic forms on the positive and full path Lie groups of finite acyclic quivers. For the nilpotent positive path Lie groups, the criterion also determines whether their compact quotients admit symplectic forms and forces the nilpotency step to be at most three. For the completely solvable full path Lie groups, we give a direct combinatorial criterion and an equivalent recursive criterion. In the symplectic case, the recursive procedure is realized by successive Hamiltonian reductions ending at an abelian symplectic Lie group. We characterize the existence of Lagrangian normal subgroups for a given form in both families, with applications to Lagrangian torus fibrations of compact nilmanifolds. We also describe the cohomology rings of the compact symplectic nilmanifolds and determine all Lefschetz ranks.

明确披露 AI 协作：AI Declaration 明确将定理 4.8 和 5.24 的证明归于 ChatGPT 6，作者负责核验、组织并严谨呈现；引言将它们分别列入核心定理 D 与 B。模型还完成附录计算，并辅助语言润色、校对和表述检查；正文由作者撰写。记录核心证明思路、证明、计算与语言辅助，不把作者核验误记为 AI 核验。

来源：https://arxiv.org/pdf/2610.23794v1 · PDF 第 47 页，AI Declaration；引言 Theorem B 与 D

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI Declaration 明确将定理 4.8 和 5.24 的证明归于 ChatGPT 6，作者负责核验、组织并严谨呈现；引言将它们分别列入核心定理 D 与 B。模型还完成附录计算，并辅助语言润色、校对和表述检查；正文由作者撰写。记录核心证明思路、证明、计算与语言辅助，不把作者核验误记为 AI 核验。

来源：https://arxiv.org/pdf/2610.23794v1

[arXiv](https://arxiv.org/abs/2610.23794)

## A duality principle for the neighbourhood of manifolds and applications to counting rational points near curves

Lauritz Streck

建立把流形附近有理点计数转化为对偶稀疏计数的原理，给出低正则平面曲线与非退化空间曲线的锐界，统一并拓展已有计数结果。

In this paper, we establish a duality principle relating the count of rationals near a manifold to a sparse counting problem for the dual. As applications, we give a short, self-contained proof of sharp bounds for planar curves under minimal regularity conditions and similarly, sharp upper bounds for non- degenerate space curves, again under minimal curvature conditions. This work recovers and extends the works of Beresnevich, Dickinson and Velani and of Vaughan and Velani on planar curves and independently proves and extends the results of Chen, Seeger, Srivastava and Technau on space curves, while providing a structural picture well-suited for generalisations. The re- sults and methods of this work precede the emergence of highly capable AI models.

明确披露 AI 协作：AI disclaimer 说明核心结果和方法先于强 AI 模型；最终阶段仍使用 Claude Opus 5.5 编辑组织稿件、复查证明并写出若干例行论证（如引理 27）。作者明确未用 AI 补齐拟留给后续工作的研究缺口。不能把摘要的时间线表述误读为全程未使用 AI。

来源：https://arxiv.org/pdf/2610.23797v1 · PDF 第 9 页，第 1.6 节 AI disclaimer and reflections

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。AI disclaimer 说明核心结果和方法先于强 AI 模型；最终阶段仍使用 Claude Opus 5.5 编辑组织稿件、复查证明并写出若干例行论证（如引理 27）。作者明确未用 AI 补齐拟留给后续工作的研究缺口。不能把摘要的时间线表述误读为全程未使用 AI。

来源：https://arxiv.org/pdf/2610.23797v1

[arXiv](https://arxiv.org/abs/2610.23797)

## Uniform restriction lower bounds and nongeodesic common nodal curves in integrable systems

Xianchao Wu、Xiao Xiao

在实解析二维环面度量族中构造固定非测地圆，同时成为无穷多个 Laplace 本征函数零集的分支；借完全可积量子系统的统一限制下界及多分支分析描述可能的联合零曲线。

We construct a family of real analytic metrics on the two-torus, for which a fixed embedded nongeodesic circle is a nodal component of infinitely many real Laplace eigenfunctions. The examples address a question asked by Bourgain-Rudnick \cite{BR11}, and give a negative answer to the question asked by Toth-Zelditch \cite{TZ21} and Han \cite{Han}: whether a curve shared by infinitely many nodal sets must be geodesic. To explain the restriction obstruction, we prove uniform $L^2$ lower bounds for joint eigenfunctions of quantum completely integrable (QCI) systems under transverse crossing and isolation of a tangential characteristic branch, then extend to multi-branch setting. The results are used to characterize the possible joint nodal curves in the Liouville tori, narrowing down the choices. Finally, the counterexample realizes one possibility for which cancellation happens exactly on a nongeodesic curve.

明确披露 AI 协作：Disclaimer 明确披露 ChatGPT 6 Astra 与 Deepseek V4.1-Flash 用于数学部分、写作、检查和作图，另有其他模型在写作中发挥非必要作用。记录已明确的写作、检查及制图用途；数学参与方式未细分，不据泛称数学部分推断核心想法。

来源：https://arxiv.org/pdf/2610.23836v1 · PDF 第 4 页，Disclaimer on AI usage

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。Disclaimer 明确披露 ChatGPT 6 Astra 与 Deepseek V4.1-Flash 用于数学部分、写作、检查和作图，另有其他模型在写作中发挥非必要作用。记录已明确的写作、检查及制图用途；数学参与方式未细分，不据泛称数学部分推断核心想法。

来源：https://arxiv.org/pdf/2610.23836v1

[arXiv](https://arxiv.org/abs/2610.23836)

## Geometric Viewpoint of $L^\infty$ Estimates for Linearized Monge-Ampère Equations

Arghya Rakshit、Derek Wu

在适当几何控制下，为 Monge–Ampère 梯度图建立 Harnack 不等式并获得线性化方程的内点 L∞ 估计，以外在球上的 Moser 迭代与外在距离梯度估计绕开传统 section 覆盖工具。

We prove a Harnack inequality on Monge--Ampère gradient graphs under suitable geometric bounds, giving us interior $L^\infty$ estimates for the linearized Monge--Ampère equation. The proof combines Moser iteration on extrensic balls with a gradient estimate for the extrinsic distance function. The argument avoids the Caffarelli--Gutiérrez Harnack inequality and the engulfing and covering properties of Monge--Ampère sections.

全文检索未见 AI 协作披露（不代表未使用 AI）

核查范围：对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。

来源：https://arxiv.org/pdf/2610.23848v1

[arXiv](https://arxiv.org/abs/2610.23848)
